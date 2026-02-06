"use client";

import React, {createContext, Dispatch, useEffect, useMemo, useReducer} from "react";
import Header                                                           from '@/components/header/header';

type StateType = {
	language?: string;
	isMobile?: boolean;
};

type ActionType = {
	type: 'set-language' | 'set-is-mobile';
	payload?: any
};

const initialState: StateType = {
	language: "en"
};

const reducer = (state: StateType, action: ActionType) => {
	switch (action.type) {
		case "set-language":
			return {...state, language: action.payload};
		case "set-is-mobile":
			return {...state, isMobile: action.payload};
		default:
			return state;
	}
};

export const AppContext = createContext<{
	state: StateType;
	dispatch: Dispatch<ActionType>;
}>({state: initialState, dispatch: () => null});

export const AppContextProvider = ({children, lang}: { children: React.ReactNode, lang: string }) => {
	const [state, dispatch] = useReducer(reducer, {...initialState, language: lang});

	const contextValue = useMemo(() => {
		return { state, dispatch };
	}, [state, dispatch]);


	useEffect(() => {

		const handleResize = () => {
			if (window.innerWidth < 1024) {
				dispatch({
					type: "set-is-mobile",
					payload: true
				});
			} else {
				dispatch({
					type: "set-is-mobile",
					payload: false
				});
			}
		}

		handleResize();
		window.removeEventListener("resize", handleResize);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);


	return (
		<AppContext.Provider value={contextValue}>
			<Header/>
			{/*<main className={state.blurMain ? 'blurred' : undefined}>{children}</main>*/}
			<main>{children}</main>
		</AppContext.Provider>
	);
};
