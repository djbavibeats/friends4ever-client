import { useState } from 'react'

import questions from './questions.js'

export default function Create() {
    const [ color, setColor ] = useState(null)
    const [ animal, setAnimal ] = useState(null)
    const [ temperature, setTemperature ] = useState(null)

    function handleRadioChange(e) {
        switch (e.target.name) {
            case ('color'):
                setColor(e.target.value)
                break
            case ('animal'):
                setAnimal(e.target.value)
                break
            case ('temperature'):
                setTemperature(e.target.value)
                break
            default:
                break
        }
    }

    function handleSubmit() {
        console.log(`Answers:`)
        console.log(`Color: ${color}`)
        console.log(`Animal: ${animal}`)
        console.log(`Temperature: ${temperature}`)
    }
    return (<>
        { questions.map((question, index) => {
            return <div key={ index } className="w-[90%] m-auto p-2 border-2 uppercase mb-2">
                {/* Title */}
                {/* <div>{ question.title }</div> */}
                {/* Question */}
                <div className="font-eurostile text-sm mb-2">{ question.question }</div>
                {/* Answers */}
                <div className="flex flex-col">
                    { question.answers.map((answer, index) => {
                        return <label key={ index }>
                            <input type="radio"
                                className="mr-2"
                                value={ answer.weight }
                                name={ question.title }
                                key={ index }
                                onChange={ handleRadioChange }
                            />
                            <span className="font-eurostile text-xs">{ answer.copy }</span>
                        </label>
                    })}
                </div>
            </div>
        }) }
        <div className="text-center w-40 border-2 border-white py-1 px-1 rounded-full bg-[rgba(0,0,0,0.075)] hover:cursor-pointer mb-2" onClick={ handleSubmit }>
            <p className="font-eurostile text-[9px] text-center">SUBMIT</p>
        </div>
    </>)    
}