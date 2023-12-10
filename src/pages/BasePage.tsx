import styled from 'styled-components'
import { PropsFor } from '../utils/propsFor'

const StyledDiv = styled.div`
  box-sizing: content-box;
  > div {
    box-sizing: border-box;
  }

  height: 100%;
  display: flex;
  flex-direction: column;
`

export const BasePage = (props: PropsFor<typeof StyledDiv>) => {
  return <StyledDiv {...props} />
}
