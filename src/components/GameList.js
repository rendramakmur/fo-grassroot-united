import { useState, useEffect } from "react"
import GameCard from "./GameCard"
import fetchData from "../helpers/fetchData";
import LoadingPage from "./LoadingPage";
import PaginationNav from "./PaginationNav";
import raiseToast from "../helpers/raiseToast";

export default function GameList({ games }) {
  const [isLoading, setIsLoading] = useState(false)
  const [gameList, setGameList] = useState(games?.data?.data)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(games?.data?.totalPage);

  useEffect(() => {
    fetchPagingData()
  }, [currentPage])

  async function fetchPagingData() {
    try {
      setIsLoading(true)
      const response = await fetchData(`/api/game?page=${currentPage}&limit=3`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      setIsLoading(false)
      setGameList(response.data.data)
      setTotalPages(response.data.totalPage)
    } catch (error) {
      setIsLoading(false)
      console.error('Fetch Error:', error);
      raiseToast('error', 'An error occurred. Please try again later.')
    }
  }

  function handlePageChange (pageNumber) {
    setCurrentPage(pageNumber);
  };

  return (
    <section>
      <div className="px-6 py-8 mx-auto h-fit">
        { isLoading ? <LoadingPage /> : <></> }
        <h1 className="block mb-3 text-2xl font-black leading-tight tracking-tight text-gray-900">
            Game List
        </h1>
        <div className="gird grid-rows-10">
          {
            gameList?.length === 0 ?
            <p>There are no game available</p>
            :
            <>
              {
                gameList?.map((game, index) => (
                  <GameCard data={game} key={game.id} />
                ))
              }

              
              <PaginationNav handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
            </>
          }
        </div>
      </div>
    </section>
  )
}