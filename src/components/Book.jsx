import styled from 'styled-components'
import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { BibleAPIClient } from '../api/BibleAPIClient'
import { OpenAIClient } from '../api/OpenAIClient'
import { useNavigate } from 'react-router-dom'

function Book() {
  const { book, chapter } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const navigate = useNavigate();
  const bibleApiClient = useMemo(() => new BibleAPIClient(), []);
  const aiClient = useMemo(() => new OpenAIClient())

  useEffect(() => {
    const fetchData = async () => {
      const data = await bibleApiClient.getChapter(book, chapter);
      setData(data);
    }

    fetchData();

    return () => {
      setIsLoading(false);
    }
  }, [book, chapter, bibleApiClient]);

  const navigateToPrevious = () => {
    const previousChapter = Number(chapter) - 1;
    navigate(`../${book}/${previousChapter}`, { replace: true });
  }

  const navigateToNext = () => {
    const nextChapter = Number(chapter) + 1;
    navigate(`../${book}/${nextChapter}`, { replace: true });
  }

  const renderNavigationButtons = () => {
    return (
      <div>
        <NavigatePreviousButton onClick={() => navigateToPrevious()} disabled={chapter == 1}>Anterior</NavigatePreviousButton>
        <NavigateNextButton onClick={() => navigateToNext()}>Próximo</NavigateNextButton>
      </div>
    )
  }

  return (
    <Container>
      <BookHeaderContainer>
        <h1>{data && data.book.name} {chapter}</h1>

        {!isLoading && renderNavigationButtons()}
      </BookHeaderContainer>

      {!data ? <>Loading...</> :
        data.verses.map(it => (
          <VerseContainer key={it.number}>
            <VerseNumber>{it.number}</VerseNumber>
            <VerseText>{it.text}</VerseText>
          </VerseContainer>
        ))
      }

      <Footer>
        {data && renderNavigationButtons()}
      </Footer>
    </Container>
  )
}

export default Book;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`

const BookHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const VerseContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`

const VerseNumber = styled.p`
  font-size: 12px;
  color: #A9A9A9;
`

const VerseText = styled.p`
  text-align: left;
  margin: .5rem 0;
`

const NavigateButton = styled.button`
  border: 1px solid #fff;
  background-color: #F5F5F5;
  width: 5rem;
  height: 2rem;
  cursor: pointer;

  :disabled {
    background-color: #D3D3D3;
  }
`

const NavigatePreviousButton = styled(NavigateButton)`
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
`

const NavigateNextButton = styled(NavigateButton)`
  border-bottom-right-radius: 1rem;
  border-top-right-radius: 1rem;
`

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 2rem 0 8rem 0;
`