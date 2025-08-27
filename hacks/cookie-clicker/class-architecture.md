- **Single responsibility**
  - `ShopItem` handles upgrade math: `canAfford`, `applyBenefit`, `increaseCost`.
  - `CookieBank` owns currency and rates: `cookies`, `perClick`, `cps`, `add`, `spend`.
  - `Shop` lists items and mediates purchases; `GameController` coordinates input/ticks/save.
  - `Storage` persists state; `UI` renders; `Timer` emits ticks.

- **Core data (focus on `ShopItem`)**
  - Fields: `id`, `name`, `type ∈ {PerClick, CPS}`, `baseCost`, `cost`, `benefit`, `costScaling`, `owned`, `unlockCondition?`.
  - Invariants: `cost > 0`, `benefit ≥ 0`, `owned ≥ 0`, `costScaling ≥ 1`.

- **Encapsulation & invariants**
  - Spending only via `CookieBank.spend(n)` → prevents negative cookies.
  - Price growth centralized in `ShopItem.increaseCost()` to keep rules consistent.
  - Benefits applied only through `ShopItem.applyBenefit(bank)`.

- **Deterministic price scaling**
  - Preferred: `nextCost = ceil(baseCost * costScaling^owned)` to avoid drift after reloads.
  - Typical `costScaling`: `1.15` (tunable per item).

- **Data flow**
  - UI → `GameController` → (`Shop`/`ShopItem`/`CookieBank`) → UI update.
  - `Timer` → `GameController.onTick()` → `CookieBank.add(cps)`.
  - `Storage` saves on interval and on significant events (purchase/quit).

- **Extensibility**
  - Add new item types (e.g., `Multiplier`, `CritChance`) by extending `applyBenefit`.
  - Gate content with `unlockCondition(state)`.
  - Swap scaling strategies (linear/exponential/stepped) behind `increaseCost()`.

- **Persistence**
  - Serialize minimal state: `CookieBank` totals and each `ShopItem`’s `owned` (or full `cost` snapshot).
  - Use DTOs for save/load; validate on hydrate.

- **Testing & UX**
  - Deterministic `Timer` for tests; property tests for scaling/afford logic.
  - 1-second ticks to batch CPS; debounce UI updates; guard purchase errors with clear messages.
