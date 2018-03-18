import React from 'react';
import ReactDOM from 'react-dom';

export default class Pager extends React.Component {
    constructor(props) {
        super(props);

        const totPages = this.calcTotalPages(this.props.records, this.props.pageSize);
        this.state = {
            totalRecords: this.props.records,
            pageSize: this.props.pageSize,
            currentPage: this.props.currentPage,
            totalPages: totPages
        }

    }
    
    calcTotalPages(totalRecords, pageSize) {
        return (Math.trunc(totalRecords / pageSize) + ((totalRecords % pageSize) > 0 ? 1 : 0));
    }

    componentWillReceiveProps(nextProps) {
        const totPages = this.calcTotalPages(nextProps.records, nextProps.pageSize);
        this.setState({
            totalRecords: nextProps.records,
            pageSize: nextProps.pageSize,
            totalPages: totPages,
            currentPage: nextProps.currentPage,
        });
    }

    goToPage(e) {
        this.goToPageNum = e.target.attributes.data.value;
        this.props.onPaging(this.goToPageNum, () => {
            this.setState({
                currentPage: this.goToPageNum
            });
        });
    }

    disabledClick(e) {
        e.preventdefault();
        return false;
    }

    renderPages() {
        const pagesNum = []
        let loop = 1;
        if (this.state.currentPage <= 3 || this.state.totalPages <= 5) {
            loop = 1
        }
        else if (this.state.currentPage >= (this.state.totalPages - 2)) {
            loop = (this.state.totalPages - 4);
        }
        else {
            loop = (this.state.currentPage - 2);
        }
        const maxPage = this.state.totalPages <= 5 ? this.state.totalPages : (loop + 4);

        for (let i = loop; i <= maxPage; i++) {
            pagesNum.push(<li key={i} className={(this.state.currentPage == i ? "active" : "")} ><a data={i} onClick={((this.state.currentPage == i)?this.disabledClick.bind(this):this.goToPage.bind(this))}>{i}</a></li>);
        }
        return pagesNum;
    }

    renderNextPages() {

        if (this.state.currentPage < this.state.totalPages) {
            return (
                [
                    <li key="next">
                        <a data={parseInt(this.state.currentPage) + 1} aria-label="Next" onClick={this.goToPage.bind(this)}>
                            <span aria-hidden="true">››</span>
                        </a>
                    </li>,
                    <li key="last">
                        <a data={this.state.totalPages} onClick={this.goToPage.bind(this)} aria-label="Last">
                            <span aria-hidden="true">››|</span>
                        </a>
                    </li>
                ]
            );
        }
        else {
            return ([
                <li key="next" className="disabled">
                    <a onClick={this.disabledClick.bind(this)} aria-label="Next">
                        <span aria-hidden="true">››</span>
                    </a>
                </li>,
                <li key="last" className="disabled" >
                    <a onClick={this.disabledClick.bind(this)} aria-label="Last" >
                        <span aria-hidden="true">››|</span>
                    </a>
                </li>
            ]);
        }
    }

    renderPrevPages() {
        if (this.state.currentPage > 1) {
            return (
                [
                    <li key="first">
                        <a data="1" aria-label="First" onClick={this.goToPage.bind(this)}>
                            <span aria-hidden="true">|‹‹</span>
                        </a>
                    </li>,
                    <li key="prev">
                        <a data={parseInt(this.state.currentPage) - 1} onClick={this.goToPage.bind(this)} aria-label="Previous">
                            <span aria-hidden="true">‹‹</span>
                        </a>
                    </li>
                ]
            );
        }
        else {
            return ([
                <li key="first" className="disabled">
                    <a onClick={this.disabledClick.bind(this)} aria-label="First">
                        <span aria-hidden="true">|‹‹</span>
                    </a>
                </li>,
                <li key="prev" className="disabled" >
                    <a onClick={this.disabledClick.bind(this)} aria-label="Previous" >
                        <span aria-hidden="true">‹‹</span>
                    </a>
                </li>
            ]);
        }
    }

    render() {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {this.renderPrevPages()}
                    {this.renderPages()}
                    {this.renderNextPages()}
                </ul>
            </nav>
        );
    }
}
