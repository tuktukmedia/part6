import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const vote = id => {
    console.log('vote', id)
    dispatch(addVote(id))
  }

  const filteredAnecdotes =
    filter !== ''
      ? anecdotes.filter(x =>
          JSON.stringify(x).toLowerCase().includes(filter.toLowerCase())
        )
      : anecdotes
  return (
    <>
      <h2>List of anecdotes</h2>
      {filteredAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
