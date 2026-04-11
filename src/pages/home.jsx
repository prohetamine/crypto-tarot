import { Link } from 'react-router'
import * as Redstone from '@prohetamine/redstone'
import { BlockBody, Input, Footer, Line, NormalFont, ShadowOverflow, Title, AddButton, MetaInfo, ContentBody, Button, ShortLine, ShortLineVertical, RowFormOwerflow } from '../global-components'
import { memo, useContext, useEffect, useState } from 'react'
import seachIcon from './../assets/icons/search.svg'
import { LanguageContext } from '../lib/language'
import md5 from 'md5'
import { LoadingContext } from '../lib/loading'

const length = 30

const Item = memo(({ data, copyId, onDelete }) => {
    const { data: { text }, type, isReverse } = JSON.parse(data.text)
        , dataBase64 = btoa([data.address, data.index, data.chainId, copyId].join(',')).replace(/=/gi, '_')
        , hashId = md5(dataBase64)

    const prediction = Redstone.useReadNote('prediction', {
        copyId: hashId,
        stas: true,
        once: true,
        randomHash: true,
        watch: false,
        cache: 60 * 1000 * 30
    })

    return (
        <Link style={{ textDecoration: 'none' }} to={`/prediction/${dataBase64}`}>
            <Line />
            <BlockBody style={{ borderRadius: '0px' }}>
                <NormalFont>{(t => t.length > length ? `${t.slice(0, length - 3)}...` : t)(text)}</NormalFont>
                <MetaInfo 
                    hasEdit={data.hasEdit}
                    isPredict={prediction.value.length !== 0}
                    onDelete={onDelete} 
                    cardCount={
                        type === 1 
                            ? 1 
                            : type === 2 
                                ? 3 
                                : 10 
                    } 
                    isReverse={isReverse}
                />
            </BlockBody>
        </Link>
    )
})

const Home = () => {
    const lang = useContext(LanguageContext)

    const [search, setSearch] = useState('')
        , { isConnected, address } = Redstone.useApp()
        , copyId = Redstone.useCounter('tarot-pages', { self: true, selfRead: true, load: true, watch: false, cache: 60 * 1000 * 10 })
        , list = Redstone.useList('tarot-todo', { address, copyId: copyId.value.count, load: copyId.status === 'success', self: true, selfRead: true, watch: false, cache: 60 * 1000 * 10 })

    const { setLoading } = useContext(LoadingContext)
    useEffect(() => {
        setLoading(true)
        
        const timeId = setTimeout(() => {
            setLoading(!(list.status === 'success' && copyId.status === 'success' || !isConnected))
        }, 100)

        return () => clearTimeout(timeId)
    }, [setLoading, list.status, copyId.status, isConnected])

    const searchRegExp = new RegExp(search, 'gi')

    return (list.status === 'success' && copyId.status === 'success') || !isConnected
                ? (
                    <ContentBody>
                        <ShadowOverflow>
                            <Title />
                            <BlockBody style={{ borderRadius: '0px', flexDirection: 'row' }}>
                                <Input 
                                    icon={seachIcon}
                                    value={search} 
                                    placeholder={lang.data.placeholder}
                                    onChange={value => setSearch(value)}
                                />
                                <AddButton />
                            </BlockBody>
                            {
                                list.value.length !== 0
                                    ? (
                                        list.value
                                            .sort((a, b) => b.timestamp - a.timestamp)
                                            .filter(e => e.text.match(searchRegExp))
                                            .slice(0, 10)
                                            .map((data, key) => (
                                                <Item 
                                                    copyId={copyId.value.count}
                                                    onDelete={async e => {
                                                        e.preventDefault()
                                                        e.stopPropagation()
                                                        const isUplaod = await list.updateValue(data, '')
                                                        
                                                        if (!isUplaod) {
                                                            alert('Error delete')
                                                        }
                                                    }}
                                                    data={data} 
                                                    key={key}
                                                />
                                            ))
                                    )
                                    : (
                                        <>
                                            <Line />
                                            <BlockBody style={{ borderRadius: '0px' }}>
                                                <NormalFont>{isConnected ? lang.data.not_found : lang.data.require_auth}</NormalFont>
                                            </BlockBody>
                                        </>
                                    )
                            }
                            {
                                list.value.length > 10 
                                    ? (
                                        <>
                                            <ShortLine />
                                            <BlockBody style={{ borderRadius: '0px', flexDirection: 'row' }}>
                                                <RowFormOwerflow>
                                                    <Button onTap={() => copyId.updateValue()}>{lang.data.сlear}</Button>
                                                </RowFormOwerflow>
                                            </BlockBody>
                                        </>
                                    )
                                    : null
                            }
                            <Footer />
                        </ShadowOverflow>
                    </ContentBody>
                ) 
                : null
}

export default Home