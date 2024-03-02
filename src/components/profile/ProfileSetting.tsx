import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppHeader from '../AppHeader';
import colors from '../../utils/colors';
import AvatarField from '../../ui/AvatarField';
import AppButton from '../../ui/AppButton';
import {getClient} from '../../api/client';
import catchAsyncError from '../../api/catchError';
import {useDispatch} from 'react-redux';
import {updateNotification} from '../../store/notification';
import {Keys, removeFromAsyncStorage} from '../../utils/asyncStorage';
import {updateBusy, updateLoggedIn, updateProfile} from '../../store/auth';

interface Props {}

export default function ProfileSetting({}: Props) {
  const dispatch = useDispatch();
  const handleLogout = async (fromAll?: boolean) => {
    dispatch(updateBusy(true));
    try {
      const endpoint = '/auth/log-out?fromAll=' + (fromAll ? 'yes' : '');
      const client = await getClient();
      await client.post(endpoint);
      await removeFromAsyncStorage(Keys.AUTH_TOKEN);
      dispatch(updateProfile(null));
      dispatch(updateLoggedIn(false));
    } catch (error) {
      const errorMsg = catchAsyncError(error);
      dispatch(updateNotification({message: errorMsg, type: 'error'}));
    }
    dispatch(updateBusy(false));
  };
  return (
    <View style={styles.container}>
      <AppHeader title="Setting" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile Setting</Text>
      </View>

      <View style={styles.settingOptionsContainer}>
        <View style={styles.avatarContainer}>
          <AvatarField />
          <Pressable>
            <Text style={styles.linkText}>Update Profile Image</Text>
          </Pressable>
        </View>
        <TextInput style={styles.nameInput} value="John" />
        <View style={styles.emailContainer}>
          <Text style={styles.email}>john@e.com</Text>
          <MaterialIcons name="verified" size={15} color={colors.SECONDARY} />
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Logout</Text>
      </View>
      <View style={styles.settingOptionsContainer}>
        <Pressable onPress={() => handleLogout(true)} style={styles.logoutBtn}>
          <AntDesign name="logout" size={20} color={colors.CONTRAST} />
          <Text style={styles.logoutBtnTitle}>Logout From All</Text>
        </Pressable>
        <Pressable onPress={() => handleLogout()} style={styles.logoutBtn}>
          <AntDesign name="logout" size={20} color={colors.CONTRAST} />
          <Text style={styles.logoutBtnTitle}>Logout</Text>
        </Pressable>
      </View>

      <View style={styles.marginTop}>
        <AppButton title="Update" borderRadius={7} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titleContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.SECONDARY,
    paddingBottom: 5,
    marginTop: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.SECONDARY,
  },
  settingOptionsContainer: {
    marginTop: 15,
    paddingLeft: 15,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    color: colors.SECONDARY,
    fontStyle: 'italic',
    paddingLeft: 15,
  },
  nameInput: {
    color: colors.CONTRAST,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.CONTRAST,
    borderRadius: 7,
    marginTop: 15,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  email: {
    color: colors.CONTRAST,
    marginRight: 10,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  logoutBtnTitle: {
    color: colors.CONTRAST,
    fontSize: 18,
    marginLeft: 5,
  },
  marginTop: {
    marginTop: 15,
  },
});
