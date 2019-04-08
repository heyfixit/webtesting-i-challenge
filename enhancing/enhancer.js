module.exports = {
  succeed,
  fail,
  repair,
  get
};

function succeed(item) {
  const { enhancement } = item;

  if (enhancement >= 0 && enhancement <= 20) {
    if (enhancement < 20) {
      return { ...item, enhancement: enhancement + 1 };
    } else {
      return { ...item };
    }
  } else {
    throw 'Enhancement value out of range. Must be between 0 and 20 inclusive';
  }
}

function fail(item) {
  const { durability, enhancement } = item;
  const newItem = { ...item };

  if (durability === undefined || enhancement === undefined) {
    throw 'Fail expects durability and enhancement properties';
  }

  if (enhancement < 15) {
    newItem.durability -= 5;
  } else if (enhancement >= 15) {
    newItem.durability -= 10;
    if (enhancement >= 17) {
      newItem.enhancement -= 1;
    }
  }

  return newItem;
}

function repair(item) {
  if (item.durability !== undefined) {
    return { ...item, durability: 100 };
  } else {
    throw 'Unexpected Item Format';
  }
}

function get(item) {
  const { name, enhancement } = item;
  if (name === undefined || enhancement === undefined) {
    throw 'Get expects item.name and item.enhancement to be defined';
  }

  if (enhancement === 0) {
    return { ...item };
  }

  if (enhancement > 0) {
    return { ...item, name: `[+${enhancement}] ${name}` };
  }
}
