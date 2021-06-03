import Entradas from '../../assets/Entradas.svg'
import Saidas from '../../assets/Saídas.svg'
import Total from '../../assets/Total.svg'

import { Container } from "./styles";

export function Summary() {
    return (
        <Container>
        <div>
            <header>
                <p>Entradas</p>
                <img src={Entradas} alt="Entradas" />
            </header>
            <strong>R$1000,00</strong>
        </div>
        <div>
            <header>
                <p>Saidas</p>
                <img src={Saidas} alt="Saidas" />
            </header>
            <strong>- R$120,00</strong>
        </div>
        <div className="highlight-background">
            <header>
                <p>Total</p>
                <img src={Total} alt="Total" />
            </header>
            <strong>R$880,00</strong>
        </div>
        </Container>
    )
}