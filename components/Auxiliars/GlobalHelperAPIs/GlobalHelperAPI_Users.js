import React from 'react';
import {exp} from "react-native-reanimated";
import * as globalHelper from "../GlobalHelper";



function addParameter(state, url, key, val) {
    if(val === null) return url;
    else if(state.first===true) {
        state.first = false;
        console.log(state.first);
        return url + "?" + key + "=" + val;
    }
    else return url + "&" + key + "=" + val;

}

function addParameterEvents(state, API_USER_FILTER) {
    let events = [];
    if(state.eventsAplecs)     events.push("aplecs");
    if(state.eventsBallades)   events.push("ballades");
    if(state.eventsConcerts)   events.push("concerts");
    if(state.eventsCursets)    events.push("cursets");
    if(state.eventsAltres)     events.push("altres");
    for(let i = 0; i < events.length; ++i) {
        API_USER_FILTER = addParameter(state, API_USER_FILTER, "events", events[i])
    }
    return API_USER_FILTER;
}

function addParameterHabilitats(state, url) {
    let habilitats = [];
    if(state.habilitatsComptar)     habilitats.push("comptar");
    if(state.habilitatsCompetidor)   habilitats.push("competidor");
    if(state.habilitatsCoblaCompeticio)   habilitats.push("coblaCompeticio");
    for(let i = 0; i < habilitats.length; ++i) {
        url = addParameter(state, url, "habilitats", habilitats[i])
    }
    return url;
}

function buildURL(state) {
    let API_USER_FILTER = globalHelper.API_USER + "filters";
    API_USER_FILTER = addParameter(state, API_USER_FILTER,"comarca",state.comarca);
    API_USER_FILTER = addParameter(state, API_USER_FILTER,"edatMax",state.edatMax);
    API_USER_FILTER = addParameter(state, API_USER_FILTER,"edatMin",state.edatMin);

    API_USER_FILTER = addParameterEvents(state, API_USER_FILTER);
    API_USER_FILTER = addParameterHabilitats(state, API_USER_FILTER);

    API_USER_FILTER = addParameter(state, API_USER_FILTER,"transport",state.vehicle);
    //API_USER_FILTER = addParameter(state, API_USER_FILTER,"ordenar",state.ordenar);


    state.first = true; // reset control flag
    return API_USER_FILTER;
}


export async function filterUsers(state) {
    try {
        let API_USER_FILTER = buildURL(state);
        console.log('\n\nfetch URL = ' + API_USER_FILTER+'\n\n');
        const response = await fetch(API_USER_FILTER);
        console.log('\n\nAfter Fetch \n\n');
        console.log("\n\n");
        console.log(response);
        console.log("\n\n");
        const json = await response.json();

        //console.log(json);
        console.log("\n\n");
        console.log('\n\nfilterUsers after fetch and response.json()  \n\n');


        //console.log(state.Users);
        //this.props.navigation.navigate(globalHelper.ListPerfilScreenID);

        //TODO Que faig aqui...
        console.log('\n\nfilterUsers Final \n\n');

        return json;
    }
    catch (error) {
        console.log('\n\nError:'  + error+ '\n\n');
        console.error(error);
    }

}
