import Realm from 'realm';
import * as FileSystem from 'expo-file-system';

class RealmManager {
  static realm;

  static openRealm(schema) {
    if (RealmManager.realm) {
      RealmManager.realm.close();
    }

    const realmConfig = {
      schema: [schema],
      path: `${FileSystem.documentDirectory}/my-local-realm-file.realm`,
    };

    RealmManager.realm = new Realm(realmConfig);
    return RealmManager.realm;
  }

  static closeRealm() {
    if (RealmManager.realm) {
      RealmManager.realm.close();
    }
  }
}

export default RealmManager;