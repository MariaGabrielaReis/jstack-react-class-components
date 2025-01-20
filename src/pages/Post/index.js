import React from "react";

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    const { search } = this.props.location;
    this.queryParams = new URLSearchParams(search);
  }

  render() {
    return (
      <h1>
        Post {this.props.match.params.id} - Filtro:{" "}
        {this.queryParams.get("meuQueryParam")}
      </h1>
    );
  }
}

// export default function Post() {
//   const { id } = useParams();

//   const { search } = useLocation();
//   const queryParams = useMemo(() => new URLSearchParams(search), [search]);

//   return (
//     <h1>
//       Post {id} - Filtro: {queryParams.get("meuQueryParam")}
//     </h1>
//   );
// }
