var twoSum = function(nums, target) {
  let map = {};
  console.log(map);
  for(let i = 0 ;i < nums.length ; i++){
        let value = nums[i];//2
        let nextValue = target - value;//7 
          console.log(nextValue, "hie");
          console.log(map[nextValue]);
        if(map[nextValue] !== undefined){
          return [map[nextValue], i];
        } else {
          map[value] = i;
        }
      }
  }
  
  twoSum([3,2,4], 6);