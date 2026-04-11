import * as Redstone from '@prohetamine/redstone'
import { BlockBody, Checkbox, ColumnFormOverflow, Footer, RowFormOwerflow, Select, ShadowOverflow, ShortLine, SmallFont, Title, Input, Button, ContentBody } from '../global-components'
import { useContext, useEffect, useState } from 'react'
import magickIcon from './../assets/icons/magick.svg'
import { useNavigate } from 'react-router'
import { LanguageContext } from '../lib/language'
import { LoadingContext } from '../lib/loading'

const width = '325px'

const OneCard = ({ onData }) => {
    const [text, setText] = useState('')
        , [isQuestion, setQuestion] = useState(true)
        , lang = useContext(LanguageContext)

    useEffect(() => {
        onData({})
    }, [])

    useEffect(() => {
        onData({
            text,
            isQuestion
        })
    }, [text, isQuestion])

    return (
        <BlockBody style={{ borderRadius: '0px', flexDirection: 'row' }}>
            <ColumnFormOverflow style={{ width }}>
                <RowFormOwerflow>
                    <SmallFont>{lang.data.question}</SmallFont>
                    <Checkbox value={isQuestion} onChange={() => setQuestion(!isQuestion)} />
                    <SmallFont>{lang.data.advice}</SmallFont>
                    <Checkbox value={!isQuestion} onChange={() => setQuestion(!isQuestion)} />
                </RowFormOwerflow>
                <RowFormOwerflow>
                    <SmallFont>{isQuestion ? lang.data.question : lang.data.advice}</SmallFont>
                    <Input
                        icon={magickIcon}
                        value={text} 
                        placeholder={lang.data.placeholder} 
                        onChange={value => setText(value)}
                    />
                </RowFormOwerflow>
            </ColumnFormOverflow>
        </BlockBody>
    )
}

const ThrewCard = ({ onData }) => {
    const [text, setText] = useState('')
        , [type, setType] = useState(1)
        , lang = useContext(LanguageContext)

    useEffect(() => {
        onData({})
    }, [])

    useEffect(() => {
        onData({
            text,
            type
        })
    }, [text, type])

    return (
        <BlockBody style={{ borderRadius: '0px', flexDirection: 'row' }}>
            <ColumnFormOverflow style={{ width }}>
                <RowFormOwerflow>
                    <SmallFont>{lang.data.first_card}</SmallFont>
                    <Select 
                        width='180px'
                        items={[
                            { value: 1, label: lang.data.past },
                            { value: 2, label: lang.data.thoughts },
                            { value: 3, label: lang.data.situation },
                            { value: 4, label: lang.data.you },
                        ]}
                        value={type} 
                        onChange={value => setType(value)} 
                    />
                </RowFormOwerflow>
                <RowFormOwerflow>
                    <SmallFont>{lang.data.second_card}</SmallFont>
                    <Select 
                        width='180px'
                        items={[
                            { value: 1, label: lang.data.present },
                            { value: 2, label: lang.data.feelings },
                            { value: 3, label: lang.data.obstacle },
                            { value: 4, label: lang.data.partner },
                        ]}
                        value={type} 
                        onChange={value => setType(value)} 
                    />
                </RowFormOwerflow>
                <RowFormOwerflow>
                    <SmallFont>{lang.data.third_card}</SmallFont>
                    <Select 
                        width='180px'
                        items={[
                            { value: 1, label: lang.data.future },
                            { value: 2, label: lang.data.actions },
                            { value: 3, label: lang.data.advice },
                            { value: 4, label: lang.data.relationships }
                        ]}
                        value={type} 
                        onChange={value => setType(value)} 
                    />
                </RowFormOwerflow>
                <RowFormOwerflow>
                    <SmallFont>{lang.data.question}</SmallFont>
                    <Input
                        icon={magickIcon}
                        value={text} 
                        placeholder={lang.data.placeholder}  
                        onChange={value => setText(value)}
                    />
                </RowFormOwerflow>
            </ColumnFormOverflow>
        </BlockBody>
    )
}

const CelticCross = ({ onData }) => {
    const [text, setText] = useState('')
        , lang = useContext(LanguageContext)

    useEffect(() => {
        onData({})
    }, [])

    useEffect(() => {
        onData({
            text
        })
    }, [text])

    return (
        <BlockBody style={{ borderRadius: '0px', flexDirection: 'row' }}>
            <ColumnFormOverflow style={{ width }}>
                <RowFormOwerflow>
                    <SmallFont>{lang.data.question}</SmallFont>
                    <Input
                        icon={magickIcon}
                        value={text} 
                        placeholder={lang.data.placeholder} 
                        onChange={value => setText(value)}
                    />
                </RowFormOwerflow>
            </ColumnFormOverflow>
        </BlockBody>
    )
}

const Create = () => {
    const navigate = useNavigate()
        , { isConnected, open } = Redstone.useApp()
        , [type, setType] = useState(2)
        , [isReverse, setReverse] = useState(true)
        , [data, setData] = useState({})
        , [isLocked, setLocked] = useState(false)
        , lang = useContext(LanguageContext)
        , { address } = Redstone.useApp()
        , copyId = Redstone.useCounter('tarot-pages', { self: true, selfRead: true, load: true, watch: false, cache: 60 * 1000 * 10 })
        , list = Redstone.useList('tarot-todo', { address, copyId: copyId.value.count, self: true, selfRead: true, load: false, watch: false })

    const { setLoading } = useContext(LoadingContext)
        
    useEffect(() => {
        setLoading(false)
    }, [])

    const handleUpload = async () => {
        if (!isConnected) {
            open()
            return
        }

        setLocked(true)
        const isUplaod = await list.addValue(
            JSON.stringify({
                type,
                isReverse,
                data,
                rand: Date.now()
            })
        )
        setLocked(false)
                                    
        if (isUplaod) {
            navigate('/')
        } else {
            alert('Error create')
        }
    }

    return (
        <ContentBody>
            <ShadowOverflow>
                <Title />
                <BlockBody style={{ borderRadius: '0px', flexDirection: 'row' }}>
                    <ColumnFormOverflow style={{ width }}>
                        <RowFormOwerflow>
                            <SmallFont>{lang.data.select_type}</SmallFont>
                            <Select 
                                width='220px'
                                items={[
                                    { value: 1, label: lang.data.select_type_one_card },
                                    { value: 2, label: lang.data.select_type_three_card },
                                    { value: 3, label: lang.data.select_type_celtic_cross_card }
                                ]}
                                value={type} 
                                onChange={value => setType(value)} 
                            />
                        </RowFormOwerflow>
                        <RowFormOwerflow>
                            <SmallFont>{lang.data.reverse_cards}</SmallFont>
                            <Checkbox value={isReverse} onChange={() => setReverse(!isReverse)} />
                        </RowFormOwerflow>
                    </ColumnFormOverflow>
                </BlockBody>
                <ShortLine />
                {
                    type === 1 
                        ? (
                            <OneCard onData={data => setData(data)} />
                        )
                        : type === 2
                            ? (
                                <ThrewCard onData={data => setData(data)} />
                            )
                            : (
                                <CelticCross onData={data => setData(data)} />
                            )
                }
                <ShortLine />
                <BlockBody style={{ borderRadius: '0px', flexDirection: 'row' }}>
                    <RowFormOwerflow>
                        <Button onTap={() => navigate('/')}>{lang.data.back}</Button>
                        <Button
                            onTap={handleUpload}
                            disabled={data?.text?.length === 0 || isLocked}
                        >{lang.data.save}</Button>
                    </RowFormOwerflow>
                </BlockBody>
                <Footer />
            </ShadowOverflow>
        </ContentBody>
    )
}

export default Create