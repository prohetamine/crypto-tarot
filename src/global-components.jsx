import styled from 'styled-components'
import appIcon from './assets/crystal-ball.png'
import checkedIcon from './assets/icons/checked.svg'
import addIcon from './assets/icons/add.svg'
import arrowBottomIcon from './assets/icons/arrow-bottom.svg'
import arrowTopIcon from './assets/icons/arrow-top.svg'
import removeIcon from './assets/icons/remove.svg'
import cardIcon from './assets/icons/card.svg'
import reverseIcon from './assets/icons/reverse.svg'
import moonIcon from './assets/icons/moon.svg'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Link, useNavigate } from 'react-router'
import { useContext, useRef, useState } from 'react'
import { SelectIdContext } from './lib/select-id.jsx'
import { LanguageContext } from "./lib/language.jsx"

export const ShadowOverflow = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 0px;
    border-radius: 30px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
    align-items: stretch;
`

export const BlockBody = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    border-radius: 30px;
    padding: 18px;
    background: #fff;
`

export const MiddleSmallFont = styled.div`
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 16px;
    color: #000;
`

export const NormalFont = styled(motion.div)`
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 18px;
    color: #000;
`

export const SmallFont = styled.div`
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 14px;
    color: #6e6e6e;
`

export const MiddleFont = styled.div`
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 22px;
    color: #000;
`

export const BigFont = styled.div`
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 26px;
    color: #000;
`

export const LineVertical = styled.div`
    width: 1px;
    background: linear-gradient(0deg, #fff 0%, #d4d4d4 40%, #d4d4d4 60%, #fff 100%);
`

export const ShortLineVertical = styled.div`
    border-radius: 28px;
    width: 1px;
    height: 8px;
    background: #dcdcdc;
`

export const AppTitleOverflow = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    gap: 10px;
    &:hover,:active {
        text-decoration: none;
    }
`

export const AppTitle = styled.div`
    font-family: trocchi;
    user-select: none;
    font-weight: 400;
    font-size: 26px;
    color: #2c2c2c;
`

export const AppIcon = styled.div`
    width: 26px;
    height: 26px;
    background-image: url(${appIcon});
    background-size: cover;
`

export const Line = styled.div`
    height: 1px;
    background: linear-gradient(90deg, #fff 0%, #d4d4d4 40%, #d4d4d4 60%, #fff 100%);
`

export const ShortLine = styled(Line)`
    background: linear-gradient(90deg, #fff 20%, #d4d4d4 40%, #d4d4d4 60%, #fff 80%);
`

export const InteractiveOverflow = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    gap: 10px;
    border: 1px solid #d4d4d4;
    border-radius: 10px;
    padding: 5px;
    box-sizing: border-box;
    background: linear-gradient(0deg, #eee 0%, #fff 100%);
`

const Icon = styled.div`
    width: 26px;
    height: 26px;
    background-image: url("${props => props.src}");
    background-size: cover;
`

const SmallIcon = styled(motion.div)`
    width: 14px;
    height: 14px;
    background-image: url("${props => props.src}");
    background-size: cover;
`

export const ColumnFormOverflow = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 10px;
    margin: 0px 0px;
`

export const RowFormOwerflow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
`

export const RowMetaOwerflow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 3px;
`

export const ContentBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    gap: 10px;
    width: calc(100% - 40px);
    max-width: 450px;
    margin: 0px 20px;
    align-items: stretch;
    box-sizing: border-box;
`

const size = 0.35

export const CardsView = (() => {
    const Body = styled.div`
        width: 100%;
        height: ${1600 * size}px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    `
    
    const CardOverflow = styled(motion.div)`
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: row;
        gap: 10px;
        border-radius: 18px;
        padding: 18px;
        width: ${960 * size}px;
        height: ${1600 * size}px;
        position: absolute;
        box-sizing: border-box;
        background-color: #fff;
        background-image: url(/cards/${props => props.index}.jpg);
        background-size: cover;
        box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.25);
    `

    let rotations = Array(10).fill(true).map(() => (Math.random() * 30) - 15)

    const Card = ({ onDirection, direction, index, rotate: rotateAngle, style }) => {
        const x = useMotionValue(rotateAngle)
            , rotate = useTransform(x, [-1000, 1000], [-150, 150])

        const handleDragEnd = (_, info) => {
            if (Math.abs(info.offset.x) > 120) {
                const direction = info.offset.x > 0 ? 1 : -1
                onDirection(direction)
            }
        }

        return (
            <CardOverflow 
                index={index}
                drag={direction ? false : "x"}
                style={{ x, rotate, ...style }}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                initial={{ x: 0, rotate: 0, opacity: 1 }}
                animate={{
                    x: direction ? (direction > 0 ? 1000 : -1000) : rotateAngle,
                    rotate: direction ? (direction > 0 ? 660 : -660) : rotateAngle,
                    opacity: direction ? [1, 1, 0] : [0, 1, 1]
                }}
                transition={{
                    x: { duration: 1.5 },         
                    rotate: { duration: 1.5 },  
                    opacity: { duration: 1.5, ease: "easeOut", times: direction ? [0, 0.8, 1] : [0, 0.2, 1] }
                }}
            />
        )
    }

    return ({ cards }) => {
        const lang = useContext(LanguageContext)
        const [direction, setDirection] = useState(cards.map(() => false))

        return (
            <Body>
                <Button 
                    onTap={() => {
                        rotations = Array(10).fill(true).map(() => (Math.random() * 30) - 15)
                        setDirection(cards.map(() => false))
                    }}>{lang.data.back}</Button>
                {
                    cards
                        .map((card, _index) => (
                            <Card 
                                style={{ zIndex: cards.length - _index }}
                                key={card} 
                                rotate={rotations[_index]}
                                index={card[0]}
                                direction={direction[_index]} 
                                onDirection={_value => setDirection(s => s.map((value, index) => index === _index ? _value : value))} 
                            />
                        ))
                }
            </Body>
        )
    }
})()

export const PredictMetaInfo = ({ data }) => {
    const lang = useContext(LanguageContext)
        
    return (
        <RowFormOwerflow style={{ width: '100%' }}>
            <RowMetaOwerflow>
                <SmallIcon src={cardIcon} />
                <SmallFont>{data[3].name}</SmallFont>
            </RowMetaOwerflow>
            <RowMetaOwerflow>
                <SmallIcon src={reverseIcon} />
                <SmallFont>{data[0] > 77 ? lang.data.yes : lang.data.no}</SmallFont>
            </RowMetaOwerflow>
        </RowFormOwerflow>
    )
}

export const MetaInfo = ({ onDelete, hasEdit, cardCount, isReverse, isPredict }) => {
    const lang = useContext(LanguageContext)
        
    return (
        <RowFormOwerflow>
            {
                hasEdit 
                    ? (
                        <>
                            <SmallIcon 
                                onClick={onDelete}
                                style={{ cursor: 'pointer' }} 
                                src={removeIcon} 
                            />
                            <ShortLineVertical />
                        </>
                    )
                    : (
                        null
                    )
            }
            {
                isPredict 
                    ? (
                        <>
                            <RowMetaOwerflow>
                                <SmallIcon src={cardIcon} />
                                <SmallFont>{cardCount}</SmallFont>
                            </RowMetaOwerflow>
                            <RowMetaOwerflow>
                                <SmallIcon src={reverseIcon} />
                                <SmallFont>{isReverse ? lang.data.yes : lang.data.no}</SmallFont>
                            </RowMetaOwerflow>
                        </>
                    )
                    : (
                        <RowMetaOwerflow>
                            <SmallFont>{lang.data.not_prediction}</SmallFont>
                            <SmallIcon src={moonIcon} />
                        </RowMetaOwerflow>
                    )
            }
        </RowFormOwerflow>
    )
}

export const Select = (() => {
    const Body = styled.div`
        position: relative;
    `
    const OverflowItems = styled.div`
        position: absolute;
        left: 0px;
        top: 0px;
        background: linear-gradient(0deg, #eee 0%, #fff 100%);
        border-radius: 10px;

        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: row;
        gap: 10px;
        border: 1px solid #d4d4d4;
        border-radius: 10px;
        padding: 48px 10px 10px;
    `

    const Items = styled.div`
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
    `

    return ({ value, onChange, items, width }) => {
        const selectId = useRef(Math.random())
            , select = useContext(SelectIdContext)

        const { label } = items.find(item => item.value === value)
            , open = select.id === selectId.current
        
        return (
            <Body 
                onClick={() => {
                    select.setId(s => s === 0 ? selectId.current : 0)
                }} 
                style={{ zIndex: open ? 99 : 0, width }}
            >
                <InteractiveOverflow 
                    whileTap={{
                        background: 'linear-gradient(0deg, #fff 0%, #eee 100%)'
                    }}
                    style={{ height: '38px', cursor: 'pointer', padding: '0px 5px 0px 10px', zIndex: 1, position: 'relative', userSelect: 'none' }}
                >
                    <NormalFont>{label}</NormalFont>
                    <Icon src={open ? arrowTopIcon : arrowBottomIcon} />
                </InteractiveOverflow>
                {
                    open 
                        ? (
                            <OverflowItems>
                                <Items>
                                {
                                    items
                                        .map((item, key) => (
                                            <NormalFont 
                                                key={key}
                                                style={{ cursor: 'pointer', userSelect: 'none' }}
                                                onTap={() => {
                                                    select.setId(0)
                                                    onChange(item.value)
                                                }}
                                            >
                                                {item.label}
                                            </NormalFont>
                                        ))
                                }
                                </Items>
                            </OverflowItems>
                        )
                        : (
                            null
                        )
                }
            </Body>
        )
    }
})()

export const Input = (() => {
    const Input = styled.input`
        font-family: var(--font-family);
        background: #ffffff00;
        color: #000;
        font-weight: 400;
        font-size: 18px;
        border: none;
        outline: none;
        width: 190px;
        box-sizing: border-box;

        &::placeholder {
            color: #cacaca;
        }
    `

    return ({ value, onChange, placeholder, icon }) => (
        <InteractiveOverflow 
            style={{ height: '38px', cursor: 'pointer', padding: '0px 5px 0px 10px' }}
        >
            <Input placeholder={placeholder} value={value} onChange={({ target: { value } }) => onChange(value)}/>
            <Icon src={icon} />
        </InteractiveOverflow>
    )
})()

export const Checkbox = ({ value, onChange }) => {
    return (
        <InteractiveOverflow 
            whileTap={{
                background: 'linear-gradient(0deg, #fff 0%, #eee 100%)'
            }}
            onTap={() => onChange(!value)} 
            style={{ width: '38px', height: '38px', cursor: 'pointer' }}
        >
            {
                value 
                    ? (
                        <Icon src={checkedIcon} />
                    )  
                    : (
                        null
                    )
            }
        </InteractiveOverflow>
    )
}

export const AddButton = () => {
    let navigate = useNavigate()

    return (
        <InteractiveOverflow 
            onTap={() => navigate('/create')} 
            style={{ width: '38px', height: '38px', cursor: 'pointer' }}
            whileTap={{
                background: 'linear-gradient(0deg, #fff 0%, #eee 100%)'
            }}
        >
            <Icon src={addIcon} />
        </InteractiveOverflow>
    )
}

export const Button = ({ onTap, children, disabled }) => (
    <InteractiveOverflow 
        onTap={() => disabled ? null : onTap()}
        whileTap={
            disabled 
                ? {} 
                : { background: 'linear-gradient(0deg, #fff 0%, #eee 100%)' }
        }
        style={{ opacity: disabled ? 0.5 : 1, height: '38px', cursor: 'pointer', padding: '0px 10px 0px 10px', userSelect: 'none' }}
    >
        <NormalFont>{children}</NormalFont>
    </InteractiveOverflow>
)

export const Title = ({ style }) => (
    <BlockBody style={{ borderRadius: '30px 30px 0px 0px', ...style }}>
        <AppTitleOverflow to='/'>
            <AppTitle>CryptoTarot</AppTitle>
            <AppIcon />
        </AppTitleOverflow>
    </BlockBody>
)

export const Footer = () => (
    <>
        <Line />
        <BlockBody style={{ borderRadius: '0px 0px 30px 30px', flexDirection: 'row', gap: '4px' }}>
            <MiddleSmallFont style={{ color: '#6E6E6E' }}>By </MiddleSmallFont>
            <Link to='https://prohetamine.ru/web3'>
                <MiddleSmallFont>prohetamine.ru/web3</MiddleSmallFont>
            </Link>
        </BlockBody>
    </>
)