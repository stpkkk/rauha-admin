import { createContext, ReactNode, useContext, useRef, useState } from 'react'
import styled from 'styled-components'
import { useClickOutside } from '../hooks/useClickOutside'
import { HiEllipsisVertical } from 'react-icons/hi2'

type MenusContextType = {
	openId: string
	open: (id: string) => void
	close: () => void
}

type MenuProps = {
	children: ReactNode
}

type ButtonProps = {
	children: ReactNode
	onClick?: () => void
	icon: ReactNode
}

type ListProps = {
	children: ReactNode
	id?: string
}

type ToggleProps = {
	id?: string
}

const Menu = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`

const StyledToggle = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-700);
	}
`

const StyledList = styled.ul`
	position: absolute;
	z-index: 1000;
	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius-md);
	right: 32px;
	top: 0;
`

const StyledButton = styled.button`
	width: 100%;
	text-align: left;
	background: none;
	border: none;
	padding: 1.2rem 2.4rem;
	font-size: 1.4rem;
	transition: all 0.2s;

	display: flex;
	align-items: center;
	gap: 1.6rem;

	&:hover {
		background-color: var(--color-grey-50);
	}

	& svg {
		width: 1.6rem;
		height: 1.6rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}
`

const MenusContext = createContext<MenusContextType | null>(null)

function Menus({ children }: MenuProps) {
	const [openId, setOpenId] = useState('')

	const close = () => setOpenId('')
	const open = (id: string) => setOpenId(id)

	return (
		<MenusContext.Provider value={{ openId, close, open }}>
			<Menu>{children}</Menu>
		</MenusContext.Provider>
	)
}

function List({ id, children }: ListProps) {
	const ref = useRef<HTMLUListElement>(null)

	const context = useContext(MenusContext)
	if (!context) throw new Error('List must be used within a Menus')

	const { openId, close } = context
	useClickOutside(ref, close)

	if (openId !== id) return null

	return <StyledList ref={ref}>{children}</StyledList>
}

function Toggle({ id }: ToggleProps) {
	const context = useContext(MenusContext)
	if (!context) throw new Error('Toggle must be used within a Menus')

	const { open, close, openId } = context

	function handleClick() {
		openId === '' || openId !== id ? open(id!) : close()
	}

	return (
		<StyledToggle onClick={handleClick}>
			<HiEllipsisVertical />
		</StyledToggle>
	)
}

function Button({ children, icon, onClick }: ButtonProps) {
	const context = useContext(MenusContext)
	if (!context) throw new Error('Button must be used within a Menus')

	const { close } = context

	function handleClick() {
		onClick?.()
		close()
	}

	return (
		<li>
			<StyledButton onClick={handleClick}>
				{icon}
				<span>{children}</span>
			</StyledButton>
		</li>
	)
}

Menus.Menu = Menu
Menus.List = List
Menus.Toggle = Toggle
Menus.Button = Button

export default Menus
