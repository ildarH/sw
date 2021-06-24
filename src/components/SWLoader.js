import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

export const SWLoader = () => {
    return (
        <Dimmer active>
            <Loader active inverted >Загрузка...</Loader>
        </Dimmer>
    )
}