import React, { Component } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Heading from '../common/Heading';
import Content from '../common/Content';
import Navigation from './Navigation';

import {
    getContactDetails,
    toggleContactOffice
} from '../../redux/actions/contact';

class Contact extends Component {
    constructor(props) {
        super(props);

        this.toggleOffice = this.toggleOffice.bind(this);
    }

    componentDidMount() {
        this.props.actions.getContactDetails();
    }

    toggleOffice(event) {
        event.preventDefault();

        const value = this.props.target === null ? Number(event.currentTarget.dataset.id) : null;
        this.props.actions.toggleContactOffice(value);
    }

    render() {
        const { loading, office, contact, social, multimedia, tag, minimalContact, target } = this.props;
        if (loading) {
            return (<div></div>); // Refactor to display loading animation...minimalContact
        } else {
            const main = [];
            const socials = [];
            const offices = [];
            const contacts = [];
            const children = [];
            let addressNavigation = '';console.log(office);

            if (office !== null) {
                office.forEach(o => {
                    contact.forEach(c => {
                        if (o.id === c.office && o.main && c.main) {
                            const orgnr = 'https://www.allabolag.se/<ORGNR>/bokslut'.replace('<ORGNR>', o.orgnr);
                            const phone = 'tel:<TEL>'.replace('<TEL>', c.phone);
                            const email = 'mailto:<MAIL>'.replace('<MAIL>', Buffer.from(c.email, "ascii").toString('hex'));
                            const address = c.street + ', ' + c.postal + ', '  + c.country;
                            addressNavigation = encodeURIComponent(address);
                            const find = 'https://www.google.se/maps/place/<FIND>'.replace('<FIND>', address);
                            main.push(
                                <ul key={0}>
                                    <li>
                                        <strong>
                                            {o.label}
                                        </strong>
                                        <p>
                                            Orgnr: <a href={orgnr} target='_blank' rel='noopener noreferrer'>{o.orgnr}</a>
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            {c.street}
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            {c.postal}
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            {c.country}
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            Phone: <a href={phone}>{c.phone}</a>
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            E-mail: <a href={email}>{'Us'}</a>
                                        </p>
                                    </li>
                                    <li>
                                        <strong>
                                            <a href={find}>Find us...</a>
                                        </strong>
                                    </li>
                                </ul>
                            );
                        }
                    });
                });

                social.forEach(s => {
                    socials.push(
                        <li key={s.id}>
                            <a href={s.url + s.label} target='_blank' rel='noopener noreferrer'>{s.media}</a>
                        </li>
                    );
                });

                office.forEach(o => {
                    let thumbnail = o.thumbnail;
                    let employees = o.employees;
                    if (thumbnail.box) {//TODO: Remove box and place condition with the query?//className={contact.some(c => c.office === o.id) ? '' : 'none'}
                        offices.push(
                            <li key={o.id} data-id={o.id} onClick={this.toggleOffice}>
                                <a href='#'>
                                    <img className='office_image' src={thumbnail.src} alt={thumbnail.alt} title={thumbnail.title} />
                                    <div>
                                        <span>
                                            {o.label}
                                        </span>
                                    </div>
                                </a>
                            </li>
                        );
                    }
                    if (o.id === target) {
                        employees.forEach(e => {
                            let portrait = e.portrait;
                            if (portrait.box) {//TODO: Remove box and place condition with the query?
                                const mailto = Buffer.from(e.email, "ascii").toString('hex');
                                contacts.push(
                                    <li key={e.id}>
                                        <div>
                                            <img className='contact_image' src={portrait.src} alt={portrait.alt} title={portrait.title} />
                                            <div>
                                                <span>
                                                    {e.forename + ' ' + e.surname + ', ' + e.title}
                                                </span>
                                                <span>
                                                    Phone: <a href={'tel:' + e.phone}>{e.phone}</a>
                                                </span>
                                                <span>
                                                    <a href={'mailto:' + mailto}>Send E-mail</a>
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                );
                            }
                        });
                    }
                });
            }

            children.push(
                <div key='0' className='childrenContainer'>
                    <div className='contact_summary'>
                        <div className='contact_full'>
                            { main }
                            {socials.length > 0 &&
                                <ul>
                                    <li>
                                        <strong>Follow us:</strong>
                                    </li>
                                    { socials }
                                </ul>
                            }
                        </div>
                        {!minimalContact && addressNavigation.length > 0 &&
                            <div className='contact_map'>
                                <Navigation address={addressNavigation} />
                            </div>
                        }
                    </div>
                    {!minimalContact && offices.length > 0 &&
                        <div className='contact_tree'>
                            <ul>
                                { offices }
                            </ul>
                            <ul>
                                { contacts }
                            </ul>
                        </div>
                    }
                </div>
            );

            return (
                <>
                    {minimalContact ? (
                        <>
                            { main }
                            {socials.length > 0 &&
                                <ul>
                                    <li>
                                        <strong>Follow us:</strong>
                                    </li>
                                    { socials }
                                </ul>
                            }
                        </>
                    ) : (
                        <>
                            <Content tag={tag} children={children} />
                        </>
                    )}
                </>
            );
        }
    }
}

const mapStateToProps = state => ({
    loading: state.contactComponent.loading,
    office: state.contactComponent.office,
    contact: state.contactComponent.contact,
    social: state.contactComponent.social,
    multimedia: state.contactComponent.multimedia,
    target: state.contactComponent.target
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        getContactDetails,
        toggleContactOffice
    }, dispatch)
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Contact));
