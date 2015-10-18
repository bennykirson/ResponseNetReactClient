import React from 'react';

var Form = React.createClass({


    componentWillMount() {

    },

    onChange(e) {
        var { value, name } = e.target;
        if (e.target.type === 'checkbox') {
            value = e.target.checked;
        }
        Actions.inputChange(name, value);
    },

    onSubmit(e) {
        e.preventDefault();

        var form = new FormData(React.findDOMNode(this.refs.submitForm));
       Actions.submit(form);
    },

    render() {
        var { type } = this.props.params;

        return (
            <div className="ui container">
                <Header iconName="add icon">
                    Submit New Job
                </Header>

                <form className="ui form" ref="submitForm" encType="multipart/form-data">

                    <div className="ui very padded raised segments">
                        <div className="ui segment">
                            {type !== 'fanmod_input' ? (<Description onChange={this.onChange}/>) : ''}
                            {type !== 'fanmod_input' ? (<Settings onChange={this.onChange}/>) : ''}
                            {type !== 'fanmod_output' ? '' : (<FanmodInput onChange={this.onChange}/>)}
                            <h4 className="ui dividing header">Files</h4>

                            <div className="ui equal width grid">
                                <div className="column">
                                    {type !== 'fanmod_output' ? (<FileUpload type='edge'/>) : ''}
                                </div>
                                <div className="column">
                                    {type !== 'fanmod_output' ? (<FileUpload type='node'/>) : ''}
                                </div>
                            </div>
                        </div>
                        <div className="ui right aligned segment">
                            <SubmitButton onClick={this.onSubmit}/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
});

export default Form;
