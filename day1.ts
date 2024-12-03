function pairwiseDistanceSum(raw: string) {
  const list1: number[] = []
  const list2: number[] = []
  
  for (const line of raw.split('\n')) {
    const [el1, el2] = line.split('   ')
    list1.push(parseInt(el1, 10))
    list2.push(parseInt(el2, 10))
  }
  
  list1.sort()
  list2.sort()
  
  let distanceSum = 0
  for (let i = 0; i < list1.length; i++) {
    distanceSum += Math.abs(list1[i] - list2[i])
  }
  return distanceSum
}
