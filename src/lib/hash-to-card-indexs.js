const hashToCardIndexs = (hash, isReverse) => {
    if (!hash) {
        return []
    }

    const _hash = hash.slice(2)

    return Array(32)
                .fill(true)
                .map((_, i) => 
                    parseInt(
                        (parseInt(_hash[i * 2] + _hash[(i * 2) + 1], 16) / 255) * (isReverse ? 155 : 77)
                    )
                )
}

export default hashToCardIndexs