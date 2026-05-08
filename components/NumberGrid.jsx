'use client'

export default function NumberGrid({
  numbers,
  selected,
  onSelect
}) {

  return (

    <div className="numberGrid">

      {numbers.map((num) => (

        <button
          key={num}
          className={
            selected === num
            ? 'numberBtn active'
            : 'numberBtn'
          }
          onClick={() => onSelect(num)}
        >
          {num}
        </button>

      ))}

    </div>
  )
}
