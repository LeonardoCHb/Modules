import React, { useEffect, useState } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import api, { } from '../../services/api'

import logoImg from '../../assets/logo.svg'

import { Header, RepositoryInfo, Issues } from './styles'

interface RepositoryParams {
    repository: string
}

interface Repository {
    full_name: string
    description: string
    stargazers_count: number
    forks_count: number
    open_issues_count: number
    owner: {
        login: string
        avatar_url: string
    }
}

interface Issue {
    id: number
    title: string
    user: {
        login: string
    }
}

const Repository: React.FC = () => {
    const [repository, setRepository] = useState<Repository | null>(null)
    const [issues, setIssues] = useState<Issue[]>([])

    const { params } = useRouteMatch<RepositoryParams>()

    useEffect(() => {
        api.get(`repos/${params.repository}`).then(response => {

        })
        api.get(`repos/${params.repository}/issues`).then(response => {

        })
    }, [params.repository])

    return (
        <>
            <Header>
                <img src={logoImg} alt="Github Explorer" />
                <Link to="/repositories/rocketseat/unform">
                    <FiChevronRight size={16} />
                Voltar
            </Link>
            </Header>

            {repository && (

                <RepositoryInfo>
                    <header>
                        <img src={repository.owner.avatar_url}
                            alt={repository.owner.login} />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{repository.stargazers_count}</strong>
                            <span>Stars</span>
                        </li>
                        <li>
                            <strong>{repository.forks_count}</strong>
                            <span>Stars</span>
                        </li>
                        <li>
                            <strong>{repository.open_issues_count}</strong>
                            <span>Stars</span>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}

            <Issues>
                <Link
                    to={"aflkfjskflasf"}>

                    <div>
                        <strong>fafaf</strong>
                        <p>afdfaef </p>
                    </div>

                    <FiChevronRight size={20} />
                </Link>
            </Issues>
        </>
    )
}

export default Repository