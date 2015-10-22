import React from 'react';
import TableWrapper from '../table/tableWrapper';

var FilesTab = React.createClass({
  componentWillMount() {
    if (this.props.files.length === 0)
      this.props.getFiles();
  },

  render() {
    var {files,...other}=this.props;
    var fileHeaders = [{name: "Links", id: "links"}, {name: "Content", id: "contents"}];
    return files.length === 0 ? (
        <div/>
    ) : (
        <TableWrapper headers={fileHeaders} rows={files}/>
    );


  }
});

export default FilesTab;
