const colors = require('colors');
const fs = require('fs')
const bytes = fs.readFileSync(__dirname + '/store_data.wasm');

const memory = new WebAssembly.Memory({initial: 1});
const mem_i32 = new Uint32Array(memory.buffer);
const data_addr = 32;

const data_i32_index = data_addr / 4;
const data_count = 16;
const importObject = {
  env: {
    mem: memory,
    data_addr,
    data_count
  }
};

(async () => {
  let obj = await WebAssembly.instantiate(new Uint8Array(bytes), importObject);
  for (let i = 0; i < data_i32_index + data_count + 4; i++) {
    let data = mem_i32[i];
    if (data !== 0) {
      console.log(`data[${i}] = ${data}`.red.bold)
    }
    else {
      console.log(`data[${i}] = ${data}`)
    }
  }
}) ()