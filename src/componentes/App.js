import React, { Component } from 'react';
import '../css/App.css';
import Header from './Header';
import Formulario from './Formulario';
import Listado from './Listado';
import { validarPresupuesto } from '../Helpers';
import ControlPresupuesto from './ControlPresupuesto';

class App extends Component {
  state = {
    presupuesto: '',
    restante: '',
    gastos: {}
  }

  componentDidMount() {
    this.obtenerPresupuesto();
  }

  obtenerPresupuesto = () => {
    let presupuesto = prompt('¿Cuál es tu presupuesto?');
    let resultado = validarPresupuesto(presupuesto);
    if(resultado) {
      this.setState({
        presupuesto,
        restante: presupuesto
      })
    } else {
      this.obtenerPresupuesto();
    }
    //console.log(presupuesto);
  }

  //Agregar Gasto
  agregarGasto = (gasto) => {
    const gastos = {...this.state.gastos};
    //console.log(gasto);

    gastos[`gasto${Date.now()}`] = gasto;
    //console.log(gastos);
    //restar al presupuesto
    this.restarPresupuesto(gasto.cantidadGasto)

    this.setState({
      gastos
    })
  }

  //Restar del presupuesto 
  restarPresupuesto = cantidad => {
    let restar = Number(cantidad);

    let restante = this.state.restante;

    restante -= restar;

    this.setState({
      restante
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App container">
          <Header 
            titulo="Gasto Semanal"
          />
          <div className="contenido-principal contenido">
            <div className="row">
              <div className="one-half column">
                <Formulario 
                  agregarGasto={this.agregarGasto}
                />
              </div>
              <div className="one-half column">
                <Listado 
                  gastos={this.state.gastos}
                />
                <ControlPresupuesto 
                  presupuesto={this.state.presupuesto}
                  restante={this.state.restante}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
