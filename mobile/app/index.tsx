import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, Pressable } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const SCORE_TEXT_SIZE = 180;

export default function Index() {

    const [orientation, setOrientation] = useState("");

    useEffect(() => {
        const {width, height} = Dimensions.get("window");
        setOrientation(width > height ? "landscape" : "portrait");

        Dimensions.addEventListener("change", ({window: {width, height}}) => {
            setOrientation(width > height ? "landscape" : "portrait");
        })
    }, []);

    const [teams, setTeams] = useState({
        redSide: {
            score: 0,
            bgColor: "red",
            bgHighlight: "#fa2f2f"
        },
        blueSide: {
            score: 0,
            bgColor: "blue",
            bgHighlight: "#2f36f7"
        }
    })
    
  return (
    <View style={{...style.main, flexDirection: (orientation === "portrait" ? "column" : "row")}}>

        <View
            style={{...style.teamSite, backgroundColor: teams.redSide.bgColor}}

        >
            <View style={{position: "absolute", width: "100%", height: "100%", }}>
              <Pressable 
                style={{flex: 1, alignItems: "flex-start", justifyContent: "flex-end", zIndex: 100, width: "100%", height: "50%", top: 0, backgroundColor: "rgba(0, 0, 0, 0.22)"}}
                onPress={() => {
                    setTeams({blueSide: {...teams.blueSide}, redSide: {...teams.redSide, score: (teams.redSide.score + 1)}});
                }}
              >
                <FontAwesome name="arrow-up" size={24} color="rgba(255,255,255, 0.21)" style={{paddingLeft: 12, paddingBottom: 12}}/>
              </Pressable>
              <Pressable 
                style={{flex: 1, alignItems: "flex-start", justifyContent: "flex-start", zIndex: 100, width: "100%", height: "50%", top: 0, backgroundColor: "rgba(0, 0, 0, 0.12)"}}
                onPress={() => {
                    setTeams({blueSide: {...teams.blueSide}, redSide: {...teams.redSide, score: (teams.redSide.score === 0) ? 0 : teams.redSide.score - 1}});
                }}
              >
                <FontAwesome name="arrow-down" size={24} color="rgba(255,255,255, 0.21)" style={{paddingLeft: 12, paddingTop: 12}}/>
              </Pressable>
            </View>
            <Text style={{...style.teamSiteText, fontSize: (teams.redSide.score > 999) ? 120 : SCORE_TEXT_SIZE}}>{teams.redSide.score}</Text>
        </View>

        <View
            style={{...style.teamSite, backgroundColor: teams.blueSide.bgColor}}

        >
            <View style={{position: "absolute", width: "100%", height: "100%", }}>
              <Pressable 
                style={{flex: 1, alignItems: "flex-end", justifyContent: "flex-end", zIndex: 100, width: "100%", height: "50%", top: 0, backgroundColor: "rgba(0, 0, 0, 0.22)"}}
                onPress={() => {
                    setTeams({redSide: {...teams.redSide}, blueSide: {...teams.blueSide, score: teams.blueSide.score + 1 }});
                }}
              >
                <FontAwesome name="arrow-up" size={24} color="rgba(255,255,255, 0.21)" style={{paddingRight: 12, paddingBottom: 12}}/>
              </Pressable>
              <Pressable 
                style={{flex: 1, alignItems: "flex-end", justifyContent: "flex-start", zIndex: 100, width: "100%", height: "50%", top: 0, backgroundColor: "rgba(0, 0, 0, 0.12)"}}
                onPress={() => {
                    setTeams({redSide: {...teams.redSide}, blueSide: {...teams.blueSide, score: (teams.blueSide.score === 0) ? 0 : teams.blueSide.score - 1 }});
                }}
              >
                <FontAwesome name="arrow-down" size={24} color="rgba(255,255,255, 0.21)" style={{paddingRight: 12, paddingTop: 12}}/>
              </Pressable>
            </View>
            <Text style={{...style.teamSiteText, fontSize: (teams.redSide.score > 999) ? 120 : SCORE_TEXT_SIZE}}>{teams.blueSide.score}</Text>
        </View>
        
        <Pressable 
            style={style.restartBtn}
            onPress={() => {
                setTeams({
                    blueSide: {...teams.blueSide, score: 0},
                    redSide: {...teams.redSide, score: 0},
                });
            }}
        >
            <FontAwesome name="refresh" size={54} color="white" style={style.restartIcon} /> 
        </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    },
    teamSite: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    },
    teamSiteText: {
        color: "white", 
        // fontSize: 180,
        fontWeight: "bold"
    },
    restartBtn: {
        position: "absolute",
        zIndex: 200,
        backgroundColor: "rgba(0, 0, 0, 0.21)",
        borderWidth: 0.5,
        borderColor: "rgba(255, 255, 255, 0.21)",
        borderRadius: 100,
        padding: 12,
        width: 80,
        height: 80,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    restartIcon: {
      opacity: 0.5 
    }
});
