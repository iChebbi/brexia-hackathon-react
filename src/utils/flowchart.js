import * as SRD from 'storm-react-diagrams'

export const addNodeToChart = (model, { name, color = 'darkgrey', posX = 50, posY = 50, output = false }, eventAction) => {
  const newNode = new SRD.DefaultNodeModel(name, color)
  newNode.setPosition(posX, posY)
  newNode.addInPort('Out')
  output && newNode.addOutPort('In')

  output && newNode.addListener({
    selectionChanged: e => console.log('selectionChanged', { e }),
  })
  model.addNode(newNode)

}