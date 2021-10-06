import React from 'react'
import { Stage, Layer, Image, Rect } from 'react-konva'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'


export const ProductionCanvas = () => {

    const { id } = useParams()

    const { elements: elem } = useSelector(state => state.canvasReducer)

    return (
        <>
            <h1 className="card-title mb-2">Composición</h1>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <Rect
                        x={600}
                        y={300}
                        width={(window.innerWidth / 2.5)}
                        height={400}
                        fill={'#B8E9EE'}
                        stroke={'black'}
                        strokeWidth={2}
                    />
                    {elem.map((el, index) => {
                        if ((id && elem[29].id) || !id) {
                            const imageObj = new window.Image(50, 50)
                            imageObj.src = el.imgUrl
                            return (<Image
                                key={el.id}
                                pos={index}
                                id={el.id}
                                x={el.x}
                                y={el.y}
                                width={50}
                                height={50}
                                image={imageObj}
                                numPoints={5}
                                innerRadius={20}
                                outerRadius={40}
                                opacity={0.8}
                                draggable={false}
                                scaleX={el.isDragging ? 1.2 : 1}
                                scaleY={el.isDragging ? 1.2 : 1}
                                imgUrl={el.imgUrl}
                            />
                            )
                        }
                    }
                    )
                    }
                </Layer>
            </Stage>
        </>
    )
}
