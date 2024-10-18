import "./App.css";
import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr key={pokemon.id}>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <Button variant="outlined" onClick={() => onSelect(pokemon)}>
        Select!
      </Button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect: PropTypes.func.isRequired,
};

const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      {Object.keys(base).map((key) => (
        <tr key={key}>
          <td>{key}</td>
          <td>{base[key]}</td>
        </tr>
      ))}
    </table>
  </div>
);

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
};

const Title = styled.h1`
  text-align: center;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 1rem;
`;

const Container = styled.div`
  margin: auto;
  width: 800;
  paddingtop: 2rem;
`;

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      pokemon: [],
      selected: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then((resp) => resp.json())
      .then((pokemon) =>
        this.setState({
          ...this.state,
          pokemon,
        })
      );
  }

  render() {
    return (
      <Container>
        <Title>Pokemon Search</Title>
        <TwoColumnLayout>
          <div>
            <Input
              value={this.state.filter}
              onChange={(e) =>
                this.setState({
                  ...this.state,
                  filter: e.target.value,
                })
              }
            />
            <table>
              <thead>
                <tr key={this.state.pokemon.id}>
                  <th>Name</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {this.state.pokemon
                  .filter((pokemon) =>
                    pokemon.name.english
                      .toLowerCase()
                      .includes(this.state.filter.toLowerCase())
                  )
                  .slice(0, 20)
                  .map((pokemon) => (
                    <PokemonRow
                      onSelect={(pokemon) =>
                        this.setState({
                          ...this.state,
                          selected: pokemon,
                        })
                      }
                      pokemon={pokemon}
                      key={pokemon.id}
                    />
                  ))}
              </tbody>
            </table>
          </div>
          {this.state.selected && <PokemonInfo {...this.state.selected} />}
        </TwoColumnLayout>
      </Container>
    );
  }
}

/*React.useEffect(() => {
  fetch("http://localhost:3000/starting-react/pokemon.json")
  .then((resp) => resp.json())
  .then((data) => setPokemon(data));
}, []);*/

export default App;
