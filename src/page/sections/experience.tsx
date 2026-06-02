import { Carousel } from "components/carousel"
import { styled } from "lib/goober"
import { theme } from "utils/theme"

const items = [10, 15, 25, 10, 15, 30]

const Item = styled.div`
  min-width: 100%;
  background-color: mistyrose;
  display: grid;
  place-content: center;

  *:nth-of-type(even) > & {
    background-color: powderblue;
  }
`

const Layout = styled.div`
  max-width: ${theme("space.x11")};
  width: 100%;
`

export const Experience = () => (
  <Layout>
    <Carousel.Root>
      {items.map((height, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Carousel.Item key={index} title={`Test ${index + 1}`}>
          <Item style={{ height: `${height}rem` }}>{index + 1}</Item>
        </Carousel.Item>
      ))}
    </Carousel.Root>
  </Layout>
)
