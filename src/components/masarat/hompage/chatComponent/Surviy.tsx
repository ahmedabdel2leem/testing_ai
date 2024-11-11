'use client'

import { useState } from 'react'
import { Button } from "../../../ui/Button"
import { Input } from "../../../ui/Input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../ui/Card"

interface SurveyDataItem {
    question: string;
    answer: string;
}

export default function Surviy({ questions }: any) {
    // const questions = [
    //     "What's your name?",
    //     "How old are you?",
    //     "What's your favorite color?",
    //     "Where are you from?"
    // ]

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [messages, setMessages] = useState([{ role: 'assistant', content: questions[0] }])
    const [input, setInput] = useState('')
    const [surveyData, setSurveyData] = useState<SurveyDataItem[]>([])
    const [isSurveyComplete, setIsSurveyComplete] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim() === '') return

        // Add user's answer to messages
        setMessages(prevMessages => [...prevMessages, { role: 'user', content: input }])

        // Store question and answer in surveyData
        setSurveyData(prevData => [...prevData, { question: questions[currentQuestionIndex].question_text, answer: input }])

        // Move to next question or complete survey
        if (currentQuestionIndex < questions.length - 1) {
            const nextIndex = currentQuestionIndex + 1
            setCurrentQuestionIndex(nextIndex)
            setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: questions[nextIndex].question_text }])
        } else {
            setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: "Thank you for completing the survey!" }])
            setIsSurveyComplete(true)
            // Here you would typically send the surveyData to your backend
            console.log('Survey data:', surveyData)
        }

        setInput('')
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Survey Chat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="h-[300px] overflow-y-auto space-y-4 p-4 border rounded-md">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`p-2 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground ml-auto' : 'bg-muted'
                                } max-w-[80%] ${message.role === 'user' ? 'ml-auto' : 'mr-auto'}`}
                        >
                            {message.content}
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <form onSubmit={handleSubmit} className="flex w-full space-x-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your answer..."
                        disabled={isSurveyComplete}
                    />
                    <Button type="submit" disabled={isSurveyComplete}>
                        Send
                    </Button>
                </form>
            </CardFooter>
        </Card>
    )
}