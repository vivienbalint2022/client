import * as React from 'react'
import Box from './box'
import LottieView from 'lottie-react-native'
import type {Props} from './animation'
import {useDepChangeEffect, isAndroid} from '../util/container'
type AnimationObject = {
  v: string
  fr: number
  ip: number
  op: number
  w: number
  h: number
  nm: string
  ddd: number
  assets: any[]
  layers: any[]
}
type AOM = {[key: string]: AnimationObject}

const Animation = React.memo(function Animation(props: Props) {
  const {animationType} = props
  const dataRef = React.useRef<AOM>(require('./animation-data.json'))
  const source = React.useRef<AnimationObject>(dataRef.current[animationType])
  useDepChangeEffect(() => {
    const data = dataRef.current?.[animationType]
    // never happens
    if (!data) {
      return
    }
    source.current = data
  }, [animationType])

  // android perf is really hurt due to this. Short term let it run once and hang out while we decide an alternative
  const allowLoop = !isAndroid

  return (
    <Box style={props.containerStyle}>
      <LottieView autoPlay={true} loop={allowLoop} source={source.current} style={props.style} />
    </Box>
  )
})

export default Animation
