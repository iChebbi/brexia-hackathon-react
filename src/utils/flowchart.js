import * as SRD from 'storm-react-diagrams'

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

export const getPreviousNodeColumns = currentNode => {
  if (!currentNode) return []

  if (currentNode.extras.nodeType === 'file') {
    return currentNode.extras.columns
  } else {
    console.log('not a file');
    return []
  }

}