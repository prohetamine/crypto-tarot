import { useNavigate, useParams } from 'react-router'
import * as Redstone from '@prohetamine/redstone'
import { useStasPay } from 'stas-pay'
import { BigFont, BlockBody, Button, CardsView, ColumnFormOverflow, ContentBody, Footer, Line, MiddleFont, NormalFont, PredictMetaInfo, RowFormOwerflow, ShadowOverflow, ShortLine, Title } from '../global-components'
import { memo, useContext, useEffect, useState } from 'react'
import { LanguageContext } from '../lib/language'
import md5 from 'md5'
import tarotDataRu from './../assets/tarot-data-ru.js'
import tarotDataEn from './../assets/tarot-data-en.js'
import cardsDataRu from './../assets/cards-data-ru.js'
import cardsDataEn from './../assets/cards-data-en.js'
import hashToCardIndexs from '../lib/hash-to-card-indexs.js'
import { LoadingContext } from '../lib/loading.jsx'

const Answer = memo(({ card }) => {
    const lang = useContext(LanguageContext)

    return (
        <>
            <BlockBody style={{ borderRadius: '0px' }}>
                <ColumnFormOverflow style={{ width: '100%' }}>
                    <MiddleFont>{lang.data[card[1]]}</MiddleFont>
                    <NormalFont>{card[2]}</NormalFont>
                    <PredictMetaInfo data={card} />
                </ColumnFormOverflow>
            </BlockBody>
            <ShortLine />
        </>
    )
})

const Prediction = () => {
    const { setLoading } = useContext(LoadingContext)
        , lang = useContext(LanguageContext)
        , navigate = useNavigate()
        , [isLocked, setLocked] = useState(false)

    const { dataBase64 } = useParams()
        , [address, index, chainId] = atob(dataBase64.replace(/_/gi, '=')).split(',')
        , hashId = md5(dataBase64)

    const cert = Redstone.useCertificate('prediction')
        , confirm = useStasPay()

    const prediction = Redstone.useNote('prediction', {
        copyId: hashId,
        stas: true,
        paymentAddress: '0xbcfA1b80C39F9a378b12b257934BE409Bc93eC60',
        once: true,
        randomHash: true,
        cache: 60 * 1000 * 30
    })

    const copyId = Redstone.useCounter('tarot-pages', { self: true, selfRead: true, address, load: true, watch: false, cache: 60 * 1000 * 10 })
        , item = Redstone.useReadListItem('tarot-todo', { chainId: parseInt(chainId), index: parseInt(index) }, { address, copyId: copyId.value.count, load: copyId.status === 'success', self: true, selfRead: true, watch: false, cache: 60 * 1000 * 10 })
        , { data: { text, isQuestion = true, type: threeType } = {}, isReverse = false, type } = item.value ? JSON.parse(item.value.text) : {}

    useEffect(() => {
        setLoading(true)
        
        const timeId = setTimeout(() => {
            setLoading(!(prediction.status === 'success' && item.status === 'success'))
        }, 100)

        return () => clearTimeout(timeId)
    }, [setLoading, prediction.status, item.status])

    const handlePrediction = async () => {
        const _cert = await cert.recheckValue()

        if (!_cert) {
            alert('Cert error')
        }

        if (_cert.value === 0) {
            const commission = await cert.getCommission()
            const isConfirm = await confirm(commission)
            if (isConfirm) {
                await cert.updateValue(10)
            }
        }

        const commission = await prediction.getCommission()
        const isConfirm = await confirm(commission)
        if (isConfirm) {
            setLocked(true)
            const isUpdate = await prediction.updateValue(hashId)
            if (!isUpdate) {
                alert('Error get prediction')
            }
            setLocked(false)
        }
    }

    const cards = prediction.value !== '' && !!type
                        ? hashToCardIndexs(prediction.value, isReverse)
                            .slice(0, type === 1 ? 1 : type === 2 ? 3 : 10)
                            .map(
                                index => {
                                    return lang.lang === 'ru' 
                                        ? [index, tarotDataRu[index], cardsDataRu[(index) % 78]]
                                        : [index, tarotDataEn[index], cardsDataEn[(index) % 78]]
                                }
                            )
                            .map(
                                ([cardIndex, tarotData, cardData], index) => {
                                    return type === 1 
                                                ? [cardIndex, isQuestion ? 'answer' : 'advice', tarotData.oneCard[isQuestion ? 'answer' : 'advice'], cardData]
                                                : type === 2 
                                                    ? [
                                                        cardIndex, 
                                                        index === 0 
                                                            ? ['past', 'thoughts', 'situation', 'you'][threeType - 1] 
                                                            : index === 1 
                                                                ? ['present', 'feelings', 'obstacle', 'partner'][threeType - 1] 
                                                                : ['future', 'actions', 'advice', 'relationships'][threeType - 1], 
                                                        tarotData.threeCard[threeType - 1][
                                                            index === 0 
                                                                ? ['past', 'thoughts', 'situation', 'you'][threeType - 1] 
                                                                : index === 1 
                                                                    ? ['present', 'feelings', 'obstacle', 'partner'][threeType - 1]
                                                                    : ['future', 'actions', 'advice', 'relationships'][threeType - 1]
                                                        ],
                                                        cardData
                                                    ]
                                                    : [cardIndex, `card${index+1}`, tarotData.celticCross[`card${index+1}`], cardData]
                                }
                                    
                            )
                        : []

    return prediction.status === 'success' && item.status === 'success' 
                ? prediction.value.length === 0 
                    ? (
                        <ContentBody>
                            <ShadowOverflow>
                                <Title />
                                <BlockBody style={{ borderRadius: '0px' }}>
                                    <ColumnFormOverflow style={{ width: '100%' }}>
                                        <MiddleFont>{isQuestion ? lang.data.question : lang.data.advice}</MiddleFont>
                                        <NormalFont>{text || lang.data.load}</NormalFont>
                                    </ColumnFormOverflow>
                                </BlockBody>
                                <ShortLine />
                                <BlockBody style={{ borderRadius: '0px', flexDirection: 'row' }}>
                                    <RowFormOwerflow>
                                        <Button onTap={() => navigate('/')}>{lang.data.back}</Button>
                                        <Button onTap={() => handlePrediction()} disabled={isLocked}>{lang.data.get_prediction}</Button>
                                    </RowFormOwerflow>
                                </BlockBody>
                                <Footer />
                            </ShadowOverflow>
                        </ContentBody>
                    )
                    : (
                        <ContentBody style={{ marginBottom: '20px' }}>
                            <ShadowOverflow>
                                <Title style={{ borderRadius: '30px' }} />
                            </ShadowOverflow>
                            <CardsView cards={cards} />
                            <ShadowOverflow>
                                <BlockBody style={{ borderRadius: '30px 30px 0px 0px' }}>
                                    <BigFont>Tarot Prediction</BigFont>
                                </BlockBody>
                                <BlockBody style={{ borderRadius: '0px' }}>
                                    <ColumnFormOverflow style={{ width: '100%' }}>
                                        <MiddleFont>{isQuestion ? lang.data.question : lang.data.advice}</MiddleFont>
                                        <NormalFont>{text || lang.data.load}</NormalFont>
                                    </ColumnFormOverflow>
                                </BlockBody>
                                <Line />
                                {
                                    cards.map(
                                        (card, index) => (
                                            <Answer card={card} key={index} />
                                        )
                                    )
                                }
                                <BlockBody style={{ borderRadius: '0px', flexDirection: 'row' }}>
                                    <RowFormOwerflow>
                                        <Button onTap={() => navigate('/')}>{lang.data.back}</Button>
                                    </RowFormOwerflow>
                                </BlockBody>
                                <Footer />
                            </ShadowOverflow>
                        </ContentBody>
                    )
                : null
}

export default Prediction