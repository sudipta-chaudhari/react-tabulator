import React, { Component } from "react";
import axios from "axios";
import { ReactTabulator } from "react-tabulator";
import "tabulator-tables/dist/css/tabulator.min.css"; //import Tabulator stylesheet

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      errorMsg: ""
    };
  }

  componentDidMount() {
    var config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };
    axios
      .get("https://jsonplaceholder.typicode.com/todos", config)
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(error => {
        this.setState({
          errorMsg: `Error retreiving todo's data. Detailed error : ${error}`
        });
      });
  }

  render() {
    const { todos, errorMsg } = this.state;

    const columns = [
      {
        title: "User ID",
        field: "userId",
        width: 150,
        align: "left",
        headerFilter: "input"
      },
      {
        title: "ID",
        field: "id",
        width: 150,
        align: "left",
        headerFilter: "input"
      },
      { title: "Title", field: "title", align: "left", headerFilter: "input" },
      {
        title: "Completed",
        field: "completed",
        width: 150,
        align: "left",
        headerFilter: "input"
      }
    ];

    const options = {
      layoutColumnsOnNewData: true,
      layout: "fitColumns", //fit columns to width of table (optional)
      responsiveLayout: "hide", //hide columns that dont fit on the table
      tooltips: true, //show tool tips on cells
      addRowPos: "top", //when adding a new row, add it to the top of the table
      history: true, //allow undo and redo actions on the table
      groupBy: "userId",
      pagination: "local", //paginate the data
      paginationSize: 20, //allow 20 rows per page of data
      paginationSizeSelector: [20, 50, 100, 200],
      movableColumns: true, //allow column order to be changed
      resizableRows: true //allow row order to be changed
    };

    return (
      <div>
        <ReactTabulator
          data={todos}
          columns={columns}
          tooltips={true}
          layout={"fitData"}
          options={options}
        />
        {errorMsg ? <div>{errorMsg}</div> : null}
      </div>
    );
  }
}

export default Home;
