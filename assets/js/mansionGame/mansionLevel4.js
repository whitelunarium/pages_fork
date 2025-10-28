// To build GameLevels, each contains GameObjects from below imports
import GameEnvBackground from './GameEngine/GameEnvBackground.js';
import Player from './GameEngine/Player.js';

class MansionLevel4 {
  constructor(gameEnv) {
	let width = gameEnv.innerWidth;
	let height = gameEnv.innerHeight;
	let path = gameEnv.path;

	// Background data
	const image_background = path + "/images/mansionGame/image_lvl4.png"; // be sure to include the path
	const image_data_background = {
		name: 'background',
		greeting: "This is the casino, you will try to gamble your way out of the level, survive as long as possible.",
		src: image_background,
		pixels: {height: 1280, width: 720}
	};

	
	const sprite_src_mc = path + "/images/gamify/spookMcWalk.png"; // be sure to include the path
	const MC_SCALE_FACTOR = 6;
	const sprite_data_chillguy = {
		id: 'Spook',
		greeting: "Hi, I am Spook.",
		src: sprite_src_mc,
		SCALE_FACTOR: MC_SCALE_FACTOR,
		STEP_FACTOR: 800,
		ANIMATION_RATE: 10,
		INIT_POSITION: { x: (width / 2 - width / (5 * MC_SCALE_FACTOR)), y: height - (height / MC_SCALE_FACTOR)},
		pixels: {height: 2400, width: 3600},
		orientation: {rows: 2, columns: 3},
		down: {row: 1, start: 0, columns: 3},
		downRight: {row: 1, start: 0, columns: 3, rotate: Math.PI/16},
		downLeft: {row: 0, start: 0, columns: 3, rotate: -Math.PI/16},
		left: {row: 0, start: 0, columns: 3},
		right: {row: 1, start: 0, columns: 3},
		up: {row: 1, start: 0, columns: 3},
		upLeft: {row: 0, start: 0, columns: 3, rotate: Math.PI/16},
		upRight: {row: 1, start: 0, columns: 3, rotate: -Math.PI/16},
		hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
		// Use WASD mapping like in mansionLevel6
		keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
	};

	// In-file subclass of Player that wires simple mobile on-screen controls (no new files)
	class MobilePlayer extends Player {
		constructor(gameEnv, spriteData) {
			super(gameEnv, spriteData);
			this._mobileControls = null;
			// Only create mobile controls if the device supports touch
			const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
			if (isTouch) {
				this._createMobileControls();
			}
		}

		_dispatchKey(code, type = 'keydown') {
			try {
				const keyMap = {87: 'w', 65: 'a', 83: 's', 68: 'd'};
				const key = keyMap[code] || '';
				const ev = new KeyboardEvent(type, {key: key, code: key ? `Key${key.toUpperCase()}` : '', bubbles: true});
				// Some engines check keyCode/which — try to define them if possible
				try { Object.defineProperty(ev, 'keyCode', {value: code}); } catch (e) {}
				try { Object.defineProperty(ev, 'which', {value: code}); } catch (e) {}
				window.dispatchEvent(ev);
			} catch (e) {
				console.warn('mobile control key dispatch failed', e);
			}
		}

		_createButton(label, code, styles = {}) {
			const btn = document.createElement('button');
			btn.className = 'mplayer-btn';
			btn.setAttribute('aria-label', label);
			btn.textContent = label;
			Object.assign(btn.style, {
				width: '56px',
				height: '56px',
				margin: '6px',
				borderRadius: '8px',
				background: 'rgba(0,0,0,0.45)',
				color: '#fff',
				border: '1px solid rgba(255,255,255,0.08)',
				fontSize: '18px',
				touchAction: 'none',
				...styles
			});

			const start = (e) => { e.preventDefault(); this._dispatchKey(code, 'keydown'); };
			const end = (e) => { e.preventDefault(); this._dispatchKey(code, 'keyup'); };

			btn.addEventListener('touchstart', start, {passive: false});
			btn.addEventListener('mousedown', start);
			btn.addEventListener('touchend', end);
			btn.addEventListener('mouseup', end);
			btn.addEventListener('mouseleave', end);

			return btn;
		}

		_createMobileControls() {
			if (this._mobileControls) return;
			const container = document.createElement('div');
			container.id = 'mobile-controls-container';
			Object.assign(container.style, {
				position: 'fixed',
				bottom: '20px',
				left: '20px',
				zIndex: '9998',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '4px',
				userSelect: 'none',
				pointerEvents: 'auto'
			});

			// D-pad layout: up on top, left/down/right row
			const upBtn = this._createButton('\u25B2', 87, {width: '64px', height: '64px', fontSize: '20px'});
			const row = document.createElement('div');
			Object.assign(row.style, {display: 'flex', flexDirection: 'row', alignItems: 'center'});
			const leftBtn = this._createButton('\u25C0', 65);
			const downBtn = this._createButton('\u25BC', 83);
			const rightBtn = this._createButton('\u25B6', 68);
			row.appendChild(leftBtn);
			row.appendChild(downBtn);
			row.appendChild(rightBtn);

			container.appendChild(upBtn);
			container.appendChild(row);

			// Optional action button on the right side
			const actionContainer = document.createElement('div');
			Object.assign(actionContainer.style, {position: 'fixed', right: '20px', bottom: '28px', zIndex: '9998'});
			const actionBtn = document.createElement('button');
			actionBtn.textContent = 'E';
			Object.assign(actionBtn.style, {
				width: '64px', height: '64px', borderRadius: '12px', background: 'rgba(181,0,0,0.85)', color: '#fff', border: 'none', fontSize: '20px'
			});
			// Action button simply dispatches 'keydown'/'keyup' for the E key (69)
			actionBtn.addEventListener('touchstart', (e) => { e.preventDefault(); this._dispatchKey(69, 'keydown'); }, {passive:false});
			actionBtn.addEventListener('touchend', (e) => { e.preventDefault(); this._dispatchKey(69, 'keyup'); });
			actionBtn.addEventListener('mousedown', () => this._dispatchKey(69, 'keydown'));
			actionBtn.addEventListener('mouseup', () => this._dispatchKey(69, 'keyup'));

			actionContainer.appendChild(actionBtn);

			document.body.appendChild(container);
			document.body.appendChild(actionContainer);

			this._mobileControls = {container, actionContainer};
		}

		destroy() {
			// remove mobile controls if present
			try {
				if (this._mobileControls) {
					try { document.body.removeChild(this._mobileControls.container); } catch (e) {}
					try { document.body.removeChild(this._mobileControls.actionContainer); } catch (e) {}
					this._mobileControls = null;
				}
			} catch (e) { console.warn('failed to remove mobile controls', e); }
			// call parent's destroy if it exists
			if (super.destroy) {
				try { super.destroy(); } catch (e) { /* ignore */ }
			}
		}
	}

		// List of objects defnitions for this level
		this.classes = [
			{ class: GameEnvBackground, data: image_data_background },
			// Use the MobilePlayer subclass so mobile users get an on-screen D-pad
			{ class: MobilePlayer, data: sprite_data_chillguy },
		];
  }

}

export default MansionLevel4