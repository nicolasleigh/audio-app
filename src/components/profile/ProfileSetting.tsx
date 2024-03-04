import React, {useEffect, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import AppHeader from '../AppHeader';
import colors from '../../utils/colors';
import AvatarField from '../../ui/AvatarField';
import AppButton from '../../ui/AppButton';
import {getClient} from '../../api/client';
import catchAsyncError from '../../api/catchError';
import {useDispatch, useSelector} from 'react-redux';
import {updateNotification} from '../../store/notification';
import {Keys, removeFromAsyncStorage} from '../../utils/asyncStorage';
import {
  getAuthState,
  updateBusy,
  updateLoggedIn,
  updateProfile,
} from '../../store/auth';
import deepEqual from 'deep-equal';
import {getPermissionToReadImages} from '../../utils/helper';
import ReVerificationLink from '../ReVerificationLink';
import {useQueryClient} from '@tanstack/react-query';

interface Props {}
interface ProfileInfo {
  name: string;
  avatar?: string;
}

export default function ProfileSetting({}: Props) {
  const [userInfo, setUserInfo] = useState<ProfileInfo>({name: ''});
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();
  const {profile} = useSelector(getAuthState);
  const queryClient = useQueryClient();

  const isSame = deepEqual(userInfo, {
    name: profile?.name,
    avatar: profile?.avatar,
  });

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

  const handleSubmit = async () => {
    setBusy(true);
    try {
      if (!userInfo.name.trim()) {
        return dispatch(
          updateNotification({
            message: 'Profile name is required',
            type: 'error',
          }),
        );
      }
      const formData = new FormData();
      formData.append('name', userInfo.name);

      if (userInfo.avatar) {
        formData.append('avatar', {
          name: 'avatar',
          type: 'image/jpeg',
          uri: userInfo.avatar,
        });
      }

      const client = await getClient({'Content-Type': 'multipart/form-data'});
      const {data} = await client.post('/auth/update-profile', formData);
      dispatch(updateProfile(data.profile));
      dispatch(
        updateNotification({message: 'Profile updated', type: 'success'}),
      );
    } catch (error) {
      const errorMsg = catchAsyncError(error);
      dispatch(updateNotification({message: errorMsg, type: 'error'}));
    }
    setBusy(false);
  };

  const handleImageSelect = async () => {
    try {
      await getPermissionToReadImages();
      const {path} = await ImagePicker.openPicker({
        cropping: true,
        width: 300,
        height: 300,
      });
      setUserInfo({...userInfo, avatar: path});
    } catch (error) {
      console.log(error);
    }
  };

  const clearHistory = async () => {
    try {
      const client = await getClient();
      dispatch(
        updateNotification({
          message: 'Your histories will be removed!',
          type: 'success',
        }),
      );
      await client.delete('/history?all=yes');
      queryClient.invalidateQueries({queryKey: ['histories']});
    } catch (error) {
      const errorMsg = catchAsyncError(error);
      dispatch(updateNotification({message: errorMsg, type: 'error'}));
    }
  };

  const handleOnHistoryClear = () => {
    Alert.alert(
      'Are you sure?',
      'This action will clear out all the history!',
      [
        {
          text: 'Clear',
          style: 'destructive',
          onPress() {
            clearHistory();
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {
        cancelable: true, // only for android
      },
    );
  };

  useEffect(() => {
    if (profile) {
      setUserInfo({name: profile.name, avatar: profile.avatar});
    }
  }, [profile]);

  return (
    <View style={styles.container}>
      <AppHeader title="Setting" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile Setting</Text>
      </View>

      <View style={styles.settingOptionsContainer}>
        <View style={styles.avatarContainer}>
          <AvatarField source={userInfo.avatar} />
          <Pressable onPress={handleImageSelect}>
            <Text style={styles.linkText}>Update Profile Image</Text>
          </Pressable>
        </View>
        <TextInput
          onChangeText={text => setUserInfo({...userInfo, name: text})}
          style={styles.nameInput}
          value={userInfo.name}
        />
        <View style={styles.emailContainer}>
          <Text style={styles.email}>{profile?.email}</Text>
          {profile?.verified ? (
            <MaterialIcons name="verified" size={15} color={colors.SECONDARY} />
          ) : (
            <ReVerificationLink linkTitle="verify" activeAtFirst />
          )}
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>History</Text>
      </View>
      <View style={styles.settingOptionsContainer}>
        <Pressable
          onPress={handleOnHistoryClear}
          style={styles.buttonContainer}>
          <MaterialCommunityIcons
            name="broom"
            size={20}
            color={colors.CONTRAST}
          />
          <Text style={styles.buttonTitle}>Clear All</Text>
        </Pressable>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Logout</Text>
      </View>
      <View style={styles.settingOptionsContainer}>
        <Pressable
          onPress={() => handleLogout(true)}
          style={styles.buttonContainer}>
          <AntDesign name="logout" size={20} color={colors.CONTRAST} />
          <Text style={styles.buttonTitle}>Logout From All</Text>
        </Pressable>
        <Pressable
          onPress={() => handleLogout()}
          style={styles.buttonContainer}>
          <AntDesign name="logout" size={20} color={colors.CONTRAST} />
          <Text style={styles.buttonTitle}>Logout</Text>
        </Pressable>
      </View>

      {!isSame ? (
        <View style={styles.marginTop}>
          <AppButton
            onPress={handleSubmit}
            busy={busy}
            title="Update"
            borderRadius={7}
          />
        </View>
      ) : null}
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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonTitle: {
    color: colors.CONTRAST,
    fontSize: 18,
    marginLeft: 5,
  },
  marginTop: {
    marginTop: 15,
  },
});
