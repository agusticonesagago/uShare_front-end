import React from 'react';
import * as globalHelper from "../GlobalHelper";
import * as GlobalHelperAPI_Users from "./GlobalHelperAPI_Users"




function addParameter(state, url, key, val) {
    if(val === null || val === "") return url;
    else if(state.first===true) {
        state.first = false;
        console.log(state.first);
        return url + "?" + key + "=" + val;
    }
    else return url + "&" + key + "=" + val;

}

function addParameterEvents(state, API_USER_FILTER) {
    let events = [];
    if(state.aplecs)     events.push("Aplec");
    if(state.ballades)   events.push("Ballada"); //
    if(state.concerts)   events.push("Concert");
    if(state.cursets)    events.push("Curset");
    if(state.altres)     events.push("Diversos (altres actes)");
    if(state.concursos)  events.push("Concurs");

    for(let i = 0; i < events.length; ++i) {
        API_USER_FILTER = addParameter(state, API_USER_FILTER, "tipus", events[i])
    }
    return API_USER_FILTER;
}




/*
 * Filter actes BEGIN
 */
function buildFilterURL(state) {
    let API_USER_FILTER = globalHelper.API_ACTES + "filter";
    API_USER_FILTER = addParameter(state, API_USER_FILTER,"comarca", state.comarca);
    API_USER_FILTER = addParameter(state, API_USER_FILTER,"diaMaxim", state.diaMaxim);
    API_USER_FILTER = addParameter(state, API_USER_FILTER,"diaMinim", state.diaMinim);

    API_USER_FILTER = addParameterEvents(state, API_USER_FILTER);

    state.first = true; // reset control flag
    return API_USER_FILTER;
}

export async function filterActes(state) {
    try {
        let API_ACTES_FILTER = buildFilterURL(state);
        console.log('\n\nfetch URL = ' + API_ACTES_FILTER+'\n\n');
        const response = await fetch(API_ACTES_FILTER);
        console.log('\n\nAfter Fetch \n\n');
        const json = await response.json();
        console.log("\n\n");
        console.log(response);
        console.log("\n\n");
        //console.log(json);
        console.log("\n\n");
        console.log('\n\nfilterActes after fetch and response.json()  \n\n');

        //TODO Que faig aqui...
        console.log('\n\nfilterActes Final \n\n');

        return json;
    }
    catch (error) {
        console.log('\n\nError:'  + error+ '\n\n');
        console.error(error);
    }
}
/**
 * Filter actes END
 */

/*
 * GET assistants of an acte BEGIN
 */

function buildAssistantsURL(acteID) {
    return globalHelper.API_ACTES + acteID + "/assistants";
}

export async function getAssistantsOfActe(acteID) {
    try {
        let API_ACTES_FILTER = buildAssistantsURL(acteID);
        console.log('\n\nfetch URL = ' + API_ACTES_FILTER+'\n\n');
        const response = await fetch(API_ACTES_FILTER);
        console.log('\n\nAfter Fetch \n\n');
        const json = await response.json();
        console.log("\n\n");
        console.log(response);
        console.log("\n\n");
        //console.log(json);
        console.log("\n\n");
        console.log('\n\nfilterActes after fetch and response.json()  \n\n');

        //TODO Que faig aqui...
        console.log('\n\nfilterActes Final \n\n');

        return json;
    }
    catch (error) {
        console.log('\n\nError:'  + error+ '\n\n');
        console.error(error);
    }

}
/*
 * GET assistants of an acte END
 */





/*
 * Filter assistants of an acte BEGIN
 */


export function buildFilterUsersOfActeURL(state) {
    let API_ACTE_FILTER = buildAssistantsURL(state.acteID) + "/filters";
    API_ACTE_FILTER = addParameter(state, API_ACTE_FILTER,"comarca",state.comarca);
    API_ACTE_FILTER = addParameter(state, API_ACTE_FILTER,"edatMax",state.edatMax);
    API_ACTE_FILTER = addParameter(state, API_ACTE_FILTER,"edatMin",state.edatMin);

    API_ACTE_FILTER = GlobalHelperAPI_Users.addParameterEvents(state, API_ACTE_FILTER);
    API_ACTE_FILTER = GlobalHelperAPI_Users.addParameterHabilitats(state, API_ACTE_FILTER);

    API_ACTE_FILTER = addParameter(state, API_ACTE_FILTER,"transport",state.vehicle);

    state.first = true; // reset control flag
    return API_ACTE_FILTER;
}

export async function filterUsersOfActe(state) {
    try {
        let API_ACTE_FILTER = buildFilterUsersOfActeURL(state);
        console.log('\n\nfetch URL = ' + API_ACTE_FILTER+'\n\n');
        const response = await fetch(API_ACTE_FILTER);
        console.log('\n\nAfter Fetch \n\n');
        console.log("\n\n");
        console.log(response);
        console.log("\n\n");
        const json = await response.json();

        //console.log(json);
        console.log("\n\n");
        console.log('\n\nfilterUsersOfActe after fetch and response.json()  \n\n');

        //TODO Que faig aqui...
        console.log('\n\nfilterUsersOfActe Final \n\n');

        return json;
    }
    catch (error) {
        console.log('\n\nError:'  + error+ '\n\n');
        console.error(error);
    }

}

/*
 * Filter assistants of an acte END
 */

