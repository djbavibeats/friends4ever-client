import { useState, useEffect } from 'react'

import questions from './questions.js'

export default function Create() {
    const [ page, setPage ] = useState(0)
    const [ update, setUpdate ] = useState(false)
    const [ color, setColor ] = useState(null)
    const [ userSelections, setUserSelections ] = useState(questions)
    
    useEffect(() => {
        console.log('Rendering Create Mission')
        return () => { 
            console.log('Unmounting Create Mission') 
        }
    }, [])
    
    function handleRadioChange(questionIndex, answerIndex) {
        let copy = userSelections
        copy[questionIndex].selection = answerIndex
        setUserSelections(copy)
        setUpdate(!update)
    }

    function incrementPage() {
        setPage(page + 1)
    }

    function decrementPage() {
        setPage(page - 1)
    }
    return (<>
        <div className="items-center flex-col flex px-2 w-full relative">
            <div className="w-full">
                {/* Question Title */}
                { questions.map((question, index) => {
                    { if (index === page) {
                        return <div key={ index } className="text-center my-2">
                            <p className="font-eurostile p-2 uppercase">{ question.title }</p>
                        </div>
                    }}
                }) }
                {/* Progress Indicator */}
                <div className="h h-80 border-2"> 
                    
                </div>
                {/* Question Body */}
                { questions.map((question, questionIndex) => {
                    { if (questionIndex === page) { 
                        return <div key={ questionIndex } className="w-full p-2 uppercase mb-2">
                            {/* Title */}
                            {/* <div>{ question.title }</div> */}
                            {/* Question */}
                            <div className="font-eurostile text-[9px] text-center my-4">{ question.question }</div>
                            {/* Answers */}
                            <div className="flex flex-col">
                                { question.answers.map((answer, answerIndex) => {
                                    console.log(answer.weight, answerIndex)
                                    return <div key={ answerIndex }>
                                        <input type="radio"
                                            className="mr-2 border-2 border-color-red-500 invisible"
                                            value={ answerIndex }
                                            name={ question.title }
                                            key={ answerIndex }
                                            id={ `question${questionIndex}-${answerIndex}` }
                                            checked={ userSelections[questionIndex].selection === answer.weight }
                                            onChange={ () => handleRadioChange(questionIndex, answerIndex) }
                                        />
                                        <label htmlFor={ `question${questionIndex}-${answerIndex}` } className="hover:cursor-pointer font-eurostile text-[9px] text-center p-2 border-2 border-white mb-2">{ answer.copy }</label>
                                    </div>
                                })}
                            </div>
                        </div>
                    }
                    }
                }) }
            </div>
            <div className="flex w-full justify-between items-stretch space-between mb-4">
                { page !== 0 ? <button className="font-eurostile text-[9px] text-center w-28 border-2 border-white py-1 px-1 rounded-full bg-[rgba(0,0,0,0.075)] hover:cursor-pointer" onClick={ decrementPage }>PREVIOUS</button> : <div></div> }
                <button className="font-eurostile text-[9px] text-center w-28 border-2 border-white py-1 px-1 rounded-full bg-[rgba(0,0,0,0.075)] hover:cursor-pointer" onClick={ incrementPage }>
                    NEXT
                </button>
            </div>
            {/* <div className="text-center w-40 border-2 border-white py-1 px-1 rounded-full bg-[rgba(0,0,0,0.075)] hover:cursor-pointer mb-2" onClick={ handleSubmit }>
                <p className="font-eurostile text-[9px] text-center">SUBMIT</p>
            </div> */}
        </div>
    </>)    
}