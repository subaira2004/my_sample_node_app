import React from 'react';
import ReactDOM from 'react-dom';

class Pager extends React.Component {
    constructor(props) {
        super(props);

        const totPages = this.calcTotalPages(this.props.records, this.props.pageSize);
        this.state = {
            totalRecords: this.props.records,
            pageSize: this.props.pageSize,
            currentPage: 1,
            totalPages: totPages
        }

    }
    calcTotalPages(totalRecords, pageSize) {
        return (Math.trunc(totalRecords / pageSize) + (totalRecords % pageSize));
    }

    componentWillReceiveProps(nextProps) {
        const totPages = this.calcTotalPages(nextProps.records, nextProps.pageSize);
        var CurPage = (this.state.pageSize != nextProps.pageSize || this.state.records != nextProps.records) ? 1 : this.state.currentPage;
        this.setState({
            totalRecords: nextProps.records,
            pageSize: nextProps.pageSize,
            totalPages: totPages,
            currentPage: CurPage,
        });
    }

    renderPages() {
        const maxPage = this.state.totalPages > 5 ? 5 : this.state.totalPages;
        const pagesNum = []
        for (const i = 1; i <= maxPage; i++) {
            pagesNum.push(<li className={(this.state.currentPage == num ? "active" : "")} ><a data={num} onClick={this.goToPage.bind(this)}>{num}</a></li>);
        }
        return pagesNum;
    }

    renderPrevPages() {
        if (this.state.currentPage > 1) {
            return (
                [
                    <li>
                        <a href="#" data="1" aria-label="First" onClick={this.goToPage}>
                            <span aria-hidden="true">|‹‹</span>
                        </a>
                    </li>,
                    <li>
                        <a href="#" data={this.state.currentPage-1}  onClick={this.goToPage} aria-label="Previous">
                            <span aria-hidden="true">‹‹</span>
                        </a>
                    </li>
                ]
            );
        }
        else {
            return ( [
                <li  className="disabled">
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
                    <li>
                        <a href="#" aria-label="Previous">
                            <span aria-hidden="true">«</span>
                        </a>
                    </li>
                    {renderPages()}
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