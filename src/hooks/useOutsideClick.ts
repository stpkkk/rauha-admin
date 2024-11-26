import { useEffect, RefObject } from 'react'

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>,
	handler: () => void,
	listenCapturing: boolean = true
): void {
	useEffect(
		function () {
			function handleClick(e: MouseEvent) {
				if (ref.current && !ref.current.contains(e.target as Node)) {
					handler()
				}
			}

			document.addEventListener('click', handleClick, listenCapturing)

			return () =>
				document.removeEventListener('click', handleClick, listenCapturing)
		},
		[ref, handler, listenCapturing]
	)
}
