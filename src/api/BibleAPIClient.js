export class BibleAPIClient {
  constructor() {
    this.bibleVersion = import.meta.env.VITE_BIBLE_DEFAULT_VERSION
    this.baseUrl = import.meta.env.VITE_BIBLE_BASE_URL
    this.headers = {
      'Authorization': `Bearer ${import.meta.env.VITE_BIBLE_API_KEY}`
    }
  }

  async getBooks() {
    const response = await fetch(`${this.baseUrl}/books`, {
      headers: this.headers
    })
    return await response.json()
  }

  async getChapter(book, chapter) {
    const response = await fetch(`${this.baseUrl}/verses/${this.bibleVersion}/${book}/${chapter}`, {
      headers: this.headers
    })
    return await response.json()
  }
}