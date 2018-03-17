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
        return (Math.trunc(totalRecords / pageSize) + (totalRecords % pageSize));
    }

    componentWillReceiveProps(nextProps) {
        const totPages = this.calcTotalPages(nextProps.records, nextProps.pageSize);
       // var CurPage = (this.state.pageSize != nextProps.pageSize || this.state.records != nextProps.records) ? 1 : this.state.currentPage;
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

    renderPages() {
        const maxPage = this.state.totalPages > 5 ? 5 : this.state.totalPages;
        const pagesNum = []
        for (let i = 1; i <= maxPage; i++) {
            pagesNum.push(<li key={i}  className={(this.state.currentPage == num ? "active" : "")} ><a data={num} onClick={this.goToPage.bind(this)}>{num}</a></li>);
        }
        return pagesNum;
    }

    renderNextPages() {

        if (this.state.currentPage < this.state.totalPages) {
            return (
                [
                    <li>
                        <a href="#" data={thus.state.currentPage + 1} aria-label="Next" onClick={this.goToPage.bind(this)}>
                            <span aria-hidden="true">››</span>
                        </a>
                    </li>,
                    <li>
                        <a href="#" data={this.state.currentPage - 1} onClick={this.goToPage.bind(this)} aria-label="Last">
                            <span aria-hidden="true">››|</span>
                        </a>
                    </li>
                ]
            );
        }
        else {
            return ([
                <li className="disabled">
                    <a href="#" aria-label="Next">
                        <span aria-hidden="true">››</span>
                    </a>
                </li>,
                <li className="disabled" >
                    <a href="#" aria-label="Last" >
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
                    <li>
                        <a href="#" data="1" aria-label="First" onClick={this.goToPage.bind(this)}>
                            <span aria-hidden="true">|‹‹</span>
                        </a>
                    </li>,
                    <li>
                        <a href="#" data={this.state.currentPage - 1} onClick={this.goToPage.bind(this)} aria-label="Previous">
                            <span aria-hidden="true">‹‹</span>
                        </a>
                    </li>
                ]
            );
        }
        else {
            return ([
                <li className="disabled">
                    <a href="#" aria-label="First">
                        <span aria-hidden="true">|‹‹</span>
                    </a>
                </li>,
                <li className="disabled" >
                    <a href="#" aria-label="Previous" >
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
                    <li>
                        <a href="#" aria-label="Next">
                            <span aria-hidden="true">»</span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}
