import './Storage';

export default class StorageOpt {
  /**
   * 保存数据
   * @param key   键
   * @param data  值
   * @param expires   有效时间
   */
  // 使用key来保存数据（key-only）。这些数据一般是全局独有的，需要谨慎单独处理的数据
  // 批量数据请使用key和id来保存(key-id)，具体请往后看
  // 除非你手动移除，这些数据会被永久保存，而且默认不会过期。
  static save(key, data, expires) {
    storage.save({
      key: key, // 注意:请不要在key中使用_下划线符号!
      data: data,

      // 如果不指定过期时间，则会使用defaultExpires参数
      // 如果设为null，则永不过期
      expires: expires,
    });
  }

  /**
   * 读取数据
   * @param key   键
   * @param callBack  回调函数
   */
  static loaddata(key, callBack) {
    storage
      .load({
        key: key,
        // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
        autoSync: true,
        // syncInBackground(默认为true)意味着如果数据过期，
        // 在调用sync方法的同时先返回已经过期的数据。
        // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
        syncInBackground: true,

        // 你还可以给sync方法传递额外的参数
        syncParams: {
          extraFetchOptions: {
            // 各种参数
          },
          someFlag: true,
        },
      })
      .then(ret => {
        // 如果找到数据，则在then方法中返回
        // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
        // 你只能在then这个方法内继续处理ret数据
        // 而不能在then以外处理
        // 也没有办法“变成”同步返回
        // 你也可以使用“看似”同步的async/await语法
        callBack(ret);
        //return ret;
      })
      .catch(err => {
        //如果没有找到数据且没有sync方法，
        //或者有其他异常，则在catch中返回
        // console.warn(err.message);
        switch (err.name) {
          case 'NotFoundError':
            // TODO;
            break;
          case 'ExpiredError':
            // TODO
            break;
        }
        //没找到数据返回空
        callBack('');
      });
  }

  /**
   * 删除数据
   * @param key   键
   */
  static delete(key) {
    // 删除单个数据
    storage.remove({
      key: key,
    });
  }
}
