import * as SRD from 'storm-react-diagrams'
import { TopologicalSort } from 'topological-sort'
import { Map } from 'core-js';

export const addNodeToChart = (model, { name, color = 'darkgrey', posX = 50, posY = 50, output = false, extras = {} }, eventAction) => {
  const newNode = new SRD.DefaultNodeModel(name, color)
  newNode.setPosition(posX, posY)
  newNode.addInPort('Out')
  newNode.extras = extras
  output && newNode.addOutPort('In')
  output && newNode.addListener({ selectionChanged: eventAction, })
  model.addNode(newNode)
}

export const getPreviousNode = currentNode => {
  // assuming only out port
  if (Object.keys(currentNode).length === 0) return []
  const linksKey = Object.keys(currentNode.getOutPorts()[0].links)
  return linksKey.map(key => currentNode.getOutPorts()[0].links[key].sourcePort.parent)
}

export const getNodeColumns = currentNode => {
  if (!currentNode) return []
  if (currentNode.extras.nodeType === 'file') {
    return currentNode.extras.columns
  } else {
    const columns = currentNode.extras.outColumn
    return columns ? columns : []
  }
}

export const sortGraph = model => {
  const nodes = new Map()
  Object.keys(model.nodes).forEach(nodeKey => nodes.set(nodeKey, model.nodes[nodeKey]))

  const sortOp = new TopologicalSort(nodes)

  Object.keys(model.links).forEach(linkKey => {
    const link = model.links[linkKey]
    const sourceNodeKey = link.sourcePort.parent.id
    const targetNodeKey = link.targetPort.parent.id
    sortOp.addEdge(sourceNodeKey, targetNodeKey)
  })

  const sorted = sortOp.sort();
  const entriesKeys = [...sorted.entries()]

  const instructions = []
  for (const el of entriesKeys) {
    const entity = el[1]
    const { extras } = entity.node
    if (extras.transformation) {
      if (extras.transformation === 'Select') instructions.push({ transformation: extras.transformation, query: extras.query })
      if (extras.transformation === 'Combine') instructions.push({ transformation: extras.transformation, joinColumnTuples: extras.tuples })
    }
  }

  console.log({ instructions })
}
