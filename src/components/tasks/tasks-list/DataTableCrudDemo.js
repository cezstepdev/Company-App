import React, {Component} from 'react';
import {classNames} from 'primereact/utils';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {ProductService} from '../service/ProductService';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Toolbar} from 'primereact/toolbar';
import {InputTextarea} from 'primereact/inputtextarea';
import {RadioButton} from 'primereact/radiobutton';
import {Mention} from 'primereact/mention';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import './DataTableDemo.css';
import TaskDetails from "../task-details/TaskDetails";
import axios from "axios";
import {Calendar} from "primereact/calendar";

export class DataTableCrudDemo extends Component {

    emptyProduct = {
        id: null,
        username: '',
        title: '',
        taskDescription: '',
        taskStatus: 'waiting',
        createDate: '',
        department: '',
        dueDate: ''
    };

    constructor(props) {
        super(props);

        this.state = {
            products: null,
            productDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            product: this.emptyProduct,
            selectedProducts: null,
            submitted: false,
            globalFilter: null,
            expandedRows: null,
            suggestions: [],
            customers: [],
            dueDate: ''
        };

        this.productService = new ProductService();
        this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.confirmDeleteProduct = this.confirmDeleteProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputNumberChange = this.onInputNumberChange.bind(this);
        this.hideDeleteProductDialog = this.hideDeleteProductDialog.bind(this);
        this.hideDeleteProductsDialog = this.hideDeleteProductsDialog.bind(this);
    }

    componentDidMount() {
        const config = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        };

        console.log('https://company-manager-api.herokuapp.com/api/v1/task/' + localStorage.getItem("username"));
        axios.get('https://company-manager-api.herokuapp.com/api/v1/task/' + localStorage.getItem("username"), config).then(
            res => {
                console.log(res);
                this.setState({products: res.data})
            }
        );
    }

    openNew() {
        this.setState({
            product: this.emptyProduct,
            submitted: false,
            productDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            productDialog: false
        });
    }

    hideDeleteProductDialog() {
        this.setState({deleteProductDialog: false});
    }

    hideDeleteProductsDialog() {
        this.setState({deleteProductsDialog: false});
    }

    saveProduct() {
        let state = {submitted: true};
        this.setState({submitted: true});

        if (this.state.product.department && this.state.product.title) {
            let products = [...this.state.products];
            let product = {...this.state.product};
            if (this.state.product.id) {
                const index = this.findIndexById(this.state.product.id);

                let data = {
                    id: product.id,
                    username: product.username,
                    title: product.title,
                    taskDescription: product.taskDescription,
                    complexity: product.complexity,
                    taskStatus: product.taskStatus,
                    dueDate: product.dueDate,
                    inProgressDate: product.inProgressDate,
                    createDate: product.createDate,
                    testingDate: product.testingDate,
                    doneDate: product.doneDate
                };

                const config = {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                };

                axios.patch('https://company-manager-api.herokuapp.com/api/v1/task', data, config).then(
                    res => {
                        product.username = res.data.username;
                        product.title = res.data.title;
                        product.taskDescription = res.data.taskDescription;
                        product.complexity = res.data.complexity;

                        products[index] = product;
                        this.toast.show({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});

                        state = {
                            ...state,
                            products,
                            productDialog: false,
                            product: this.emptyProduct
                        };
                        this.setState(state);
                    }
                ).catch(
                    reason => {
                        console.log(reason);
                    }
                );
            } else {
                let data = {
                    username: product.username,
                    title: product.title,
                    taskDescription: product.taskDescription,
                    complexity: product.complexity,
                    department: product.department,
                    dueDate: product.dueDate
                };

                const config = {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                };

                axios.post('https://company-manager-api.herokuapp.com/api/v1/task', data, config).then(
                    res => {
                        product.id = res.data.id;
                        product.taskStatus = res.data.taskStatus;
                        product.username = res.data.username;
                        this.toast.show({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});

                        products.push(product);
                        state = {
                            ...state,
                            products,
                            productDialog: false,
                            product: this.emptyProduct
                        };
                        this.setState(state);
                    }
                );
            }
        }
    }

    editProduct(product) {
        this.setState({
            product: {...product},
            productDialog: true
        });
    }

    confirmDeleteProduct(product) {
        this.setState({
            product,
            deleteProductDialog: true
        });
    }

    deleteProduct() {
        let products = this.state.products.filter(val => val.id !== this.state.product.id);
        this.setState({
            products,
            deleteProductDialog: false,
            product: this.emptyProduct
        });

        const config = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        };

        axios.delete('https://company-manager-api.herokuapp.com/api/v1/task/' + this.state.product.id, config)
            .then(r => console.log(r))
            .catch(reason => console.log(reason));
        this.toast.show({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
    }

    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.state.products.length; i++) {
            if (this.state.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    confirmDeleteSelected() {
        this.setState({deleteProductsDialog: true});
    }

    deleteSelectedProducts() {
        let products = this.state.products.filter(val => !this.state.selectedProducts.includes(val));
        this.setState({
            products,
            deleteProductsDialog: false,
            selectedProducts: null
        });
        this.toast.show({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
    }

    onCategoryChange(e) {
        let product = {...this.state.product};
        product['complexity'] = e.value;
        this.setState({product});
    }

    onInputChange(e, username) {
        let tmp;
        const val = (e.target && e.target.value) || '';

        if (username === "username" || username === 'department') {
            tmp = val.substring(1);
        } else {
            tmp = val;
        }

        let product = {...this.state.product};
        product[`${username}`] = tmp;

        this.setState({product});
    }

    onInputNumberChange(e, username) {
        const val = e.value || 0;
        let product = {...this.state.product};
        product[`${username}`] = val;

        this.setState({product});
    }

    rightToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew}/>
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV}/>
            </React.Fragment>
        )
    }

    statusBodyTemplate(rowData) {
        let today = new Date();
        let dueDate = new Date(rowData.dueDate);
        return <div>
            {(dueDate.getDate() >= today.getDate()) && <span className={`product-badge status-${rowData.taskStatus.toLowerCase()}`}>{rowData.taskStatus}</span>}
            {(dueDate.getDate() - 1 <= today.getDate()) && (dueDate.getDate() - today.getDate() >= 0) && <i className="pi pi-calendar-times"></i>}
            {(dueDate.getDate() < today.getDate()) && <span className={`product-badge status-expired`}>Expired</span>}
        </div>;
    }

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2"
                        onClick={() => this.editProduct(rowData)}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"
                        onClick={() => this.confirmDeleteProduct(rowData)}/>
            </React.Fragment>
        );
    }

    rowExpansionTemplate(data) {
        return (
            <div className="orders-subtable">
                <h5>{data.title} details</h5>
                <TaskDetails task={data}/>
            </div>
        );
    }

    onDueDateChange = (event) => {
        let product = {...this.state.product}
        product['dueDate'] = event.target.value.toLocaleDateString('en-CA');
        this.setState({product});
    }

    render() {
        const header = (
            <div className="table-header">
                <h5 className="p-mx-0 p-my-1">Manage Products</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                    <InputText type="search" onInput={(e) => this.setState({globalFilter: e.target.value})}
                               placeholder="Search..."/>
                </span>
                <Toolbar right={this.rightToolbarTemplate}/>
            </div>
        );

        const productDialogFooter = (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog}/>
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveProduct}/>
            </React.Fragment>
        );

        const deleteProductDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProductDialog}/>
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteProduct}/>
            </React.Fragment>
        );

        const onSearch = (event) => {
            let customers = [{name: 'Developers'},{name: 'Testers'},{name: 'Analytics'}];
            setTimeout(() => {
                const query = event.query;
                let suggestions;

                if (!query.trim().length) {
                    suggestions = [...customers];
                } else {
                    suggestions = customers.filter((customer) => {
                        return customer.name.toLowerCase().startsWith(query.toLowerCase());
                    });
                }

                this.setState({suggestions: suggestions});
                console.log(suggestions);
            }, 250);
        }

        const getUsers = () => {
            const config = {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            };

            axios.get('https://company-manager-api.herokuapp.com/api/v1/user/department/' + this.state.product.department, config).then(
                res => {
                    this.setState({customers: res.data})
                }
            );
        }

        const onUserSearch = (event) => {
            getUsers();
            let customers = this.state.customers;
            setTimeout(() => {
                const query = event.query;
                let suggestions;

                if (!query.trim().length) {
                    suggestions = [...customers];
                } else {
                    suggestions = customers.filter((customer) => {
                        return customer.username.toLowerCase().startsWith(query.toLowerCase());
                    });
                }

                this.setState({suggestions: suggestions});
            }, 250);
        }

        return (
            <div className="datatable-crud-demo">
                <Toast ref={(el) => this.toast = el}/>

                <div className="card">
                    <DataTable ref={(el) => this.dt = el} value={this.state.products}
                               selection={this.state.selectedProducts}
                               onSelectionChange={(e) => this.setState({selectedProducts: e.value})}
                               dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                               globalFilter={this.state.globalFilter} header={header} responsiveLayout="scroll"
                               expandedRows={this.state.expandedRows}
                               onRowToggle={(e) => this.setState({expandedRows: e.data})}
                               onRowExpand={this.onRowExpand} onRowCollapse={this.onRowCollapse}
                               rowExpansionTemplate={this.rowExpansionTemplate}>
                        <Column expander style={{width: '3em'}}/>
                        <Column field="username" header="User" sortable style={{minWidth: '16rem'}}/>
                        <Column field="title" header="Title" sortable style={{minWidth: '10rem'}}/>
                        <Column field="dueDate" header="Due Date" sortable style={{minWidth: '10rem'}}/>
                        <Column field="taskStatus" header="Status" body={this.statusBodyTemplate} sortable
                                style={{minWidth: '12rem'}}/>
                        <Column body={this.actionBodyTemplate} exportable={false} style={{minWidth: '8rem'}}/>
                    </DataTable>
                </div>

                <Dialog visible={this.state.productDialog} style={{width: '450px'}} header="Product Details" modal
                        className="p-fluid" footer={productDialogFooter} onHide={this.hideDialog}>
                    {this.state.product.id && <div className="p-field">
                        <label htmlFor="username">Users</label>
                        <Mention suggestions={this.state.suggestions} onSearch={onUserSearch} field="username"
                                 onChange={(e) => this.onInputChange(e, 'username')}
                                 placeholder="Please enter @ to mention people" required autoFocus
                                 className={classNames({'p-invalid': this.state.submitted && !this.state.product.username})}/>
                        {this.state.submitted && !this.state.product.username &&
                        <small className="p-error">Name is required.</small>}
                    </div>}

                    <div className="p-field">
                        <label htmlFor="department">Department</label>
                        <Mention suggestions={this.state.suggestions} onSearch={onSearch} field="name"
                                 onChange={(e) => this.onInputChange(e, 'department')}
                                 placeholder="Please enter @ to mention department" required autoFocus
                                 className={classNames({'required': this.state.submitted && !this.state.product.department})}/>

                         {this.state.submitted && !this.state.product.department.length && <small className="p-error">Department is required.</small>}
                    </div>

                    <div className="p-field">
                        <label htmlFor="Due Date">Due Date</label>
                        <Calendar value={this.state.product.dueDate} dateFormat="dd/mm/yy" onChange={(e) => this.onDueDateChange(e)} showButtonBar></Calendar>
                    </div>

                    <div className="p-field">
                        <label htmlFor="title">Title</label>
                        <InputText id="title" value={this.state.product.title} onChange={(e) => this.onInputChange(e, 'title')}
                                   className={classNames({ 'p-invalid': this.state.submitted && !this.state.product.title })} />
                        {this.state.submitted && !this.state.product.title && <small className="p-error">Title is required.</small>}
                    </div>

                    <div className="p-field">
                        <label htmlFor="taskDescription">Description</label>
                        <InputTextarea id="taskDescription" value={this.state.product.taskDescription}
                                       onChange={(e) => this.onInputChange(e, 'taskDescription')} required rows={3}
                                       cols={20}/>
                    </div>

                    <div className="p-field">
                        <label className="p-mb-3">Complexity</label>
                        <div className="complexity">
                            <div className="p-field-radiobutton p-col-6">
                                <RadioButton className="complexity-button" inputId="category1" name="category" value="1"
                                             onChange={this.onCategoryChange}
                                             checked={this.state.product.complexity === '1'}/>
                                <label htmlFor="category1">1</label>
                            </div>
                            <div className="p-field-radiobutton p-col-6">
                                <RadioButton className="complexity-button" inputId="category2" name="category" value="2"
                                             onChange={this.onCategoryChange}
                                             checked={this.state.product.complexity === '2'}/>
                                <label htmlFor="category2">2</label>
                            </div>
                            <div className="p-field-radiobutton p-col-6">
                                <RadioButton className="complexity-button" inputId="category3" name="category" value="3"
                                             onChange={this.onCategoryChange}
                                             checked={this.state.product.complexity === '3'}/>
                                <label htmlFor="category3">3</label>
                            </div>
                            <div className="p-field-radiobutton p-col-6">
                                <RadioButton className="complexity-button" inputId="category4" name="category" value="4"
                                             onChange={this.onCategoryChange}
                                             checked={this.state.product.complexity === '4'}/>
                                <label htmlFor="category4">4</label>
                            </div>
                        </div>
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteProductDialog} style={{width: '450px'}} header="Confirm" modal
                        footer={deleteProductDialogFooter} onHide={this.hideDeleteProductDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                        {this.state.product &&
                        <span>Are you sure you want to delete <b>{this.state.product.title}</b>?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }
}