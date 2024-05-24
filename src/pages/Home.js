import React, { useEffect, useState } from "react"
import Banner from "../components/Banner"
import GameList from "../components/GameList"
import raiseToast from "../helpers/raiseToast"
import fetchData from "../helpers/fetchData"
import Quote from "../components/Quote"

export default function Home() {
  const [games, setGames] = useState()

  useEffect(() => {
    try {
      const fetchGames = async () => {
        const gameListResponse = await fetchData('/api/game?page=1&limit=3', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        setGames(gameListResponse)
      }
      
      fetchGames()
    } catch (error) {
      console.error('An error has occurred:', error)
      raiseToast('error', 'An error occurred. Please try again later.')
    }
  }, [])

  return (
    <main className="mx-auto md:max-w-md h-screen w-screen">
      <Banner />
      <Quote />
      <GameList games={games} />
    </main>
  )
}