
import { useState } from 'react'
import { flows } from '../data/flows'

export function useChatbot() {
  const [activeFlow, setActiveFlow] = useState(null)
  const [currentNode, setCurrentNode] = useState(null)
  const [history, setHistory] = useState([])

  // Iniciar un flujo
  const startFlow = (flowId) => {
    const selectedFlow = flows.find(
      (flow) => flow.id === flowId
    )

    if (!selectedFlow) return

    setActiveFlow(selectedFlow)
    setCurrentNode(selectedFlow.nodes.start)
    setHistory([])
  }

  // Seleccionar una alternativa
  const selectOption = (option) => {
    if (!activeFlow || !currentNode) return

    const nextNode = activeFlow.nodes[option.nextNode]

    if (!nextNode) return

    setHistory((previousHistory) => [
      ...previousHistory,
      currentNode,
    ])

    setCurrentNode(nextNode)
  }

  // Volver al nodo anterior
  const goBack = () => {
    if (history.length === 0) return

    const previousNode = history[history.length - 1]

    setCurrentNode(previousNode)

    setHistory((previousHistory) =>
      previousHistory.slice(0, -1)
    )
  }

  // Reiniciar conversación
  const resetChat = () => {
    setActiveFlow(null)
    setCurrentNode(null)
    setHistory([])
  }

  return {
    flows,
    activeFlow,
    currentNode,
    history,
    startFlow,
    selectOption,
    goBack,
    resetChat,
  }
}
