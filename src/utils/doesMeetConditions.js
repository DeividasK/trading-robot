export function doesMeetConditions({
  conditions,
  position,
}: {|
  conditions: Conditions,
  position: Position,
|}): boolean {
  const openUnits = Number(position.long.units) + Number(position.short.units);

  if (conditions.isOpen === false && openUnits > 0) {
    return false;
  }

  if (conditions.isOpen === true && openUnits === 0) {
    return false;
  }

  return true;
}
